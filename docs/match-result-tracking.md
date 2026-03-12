# Match Result Tracking — Implementation Reference

This document summarises the W/L/D match result recording system added to Ruinstars. Use it as a reference when implementing the same pattern in a similar project.

---

## Overview

Players record the outcome of battles between squads. The opponent confirms (or disputes) the result. Confirmed results build a win/loss/draw record per squad. Elo rating fields are reserved in the schema for future calculation but are not computed yet.

**Key design decisions:**

- Result is stored as a single-character string: `"A"` (squad A won), `"B"` (squad B won), `"D"` (draw). Human-readable in raw DB queries.
- W/L/D counts are derived on read by querying match history — no denormalised counters.
- Disputes are a silent delete — no trace, no Elo impact.
- `matchDate` defaults to `now()` on record creation and serves as the canonical timestamp for future Elo ordering.
- Elo fields (`eloBeforeA`, `eloBeforeB`, `eloAfterA`, `eloAfterB`) are nullable placeholders — a stored procedure or script can backfill them later by replaying `matchDate`-ordered history.

---

## Database Changes

### New table: `MissionResult`

| Column | Type | Notes |
| --- | --- | --- |
| `missionResultId` | `INT` AUTO_INCREMENT PK | |
| `squadAId` | `VARCHAR(20)` FK → Squad | The reporting player's squad |
| `squadBId` | `VARCHAR(20)` FK → Squad | The opponent's squad |
| `result` | `VARCHAR(1)` | `"A"` / `"B"` / `"D"` |
| `squadAConfirmed` | `BOOLEAN` DEFAULT `true` | Set true on creation |
| `squadBConfirmed` | `BOOLEAN` DEFAULT `false` | Set true when opponent confirms |
| `matchDate` | `DATETIME` DEFAULT `now()` | Created automatically |
| `eloBeforeA` | `FLOAT` NULL | Reserved for future Elo calc |
| `eloBeforeB` | `FLOAT` NULL | Reserved for future Elo calc |
| `eloAfterA` | `FLOAT` NULL | Reserved for future Elo calc |
| `eloAfterB` | `FLOAT` NULL | Reserved for future Elo calc |

Both FK columns cascade delete (if a squad is deleted, its match records are removed).

Index on `squadAId` and `squadBId`.

### Modified tables

| Table | Column added | Type | Notes |
| --- | --- | --- | --- |
| `User` | `eloRating` | `FLOAT` DEFAULT `1000` | Placeholder for future user-level Elo |
| `SquadType` | `eloRating` | `FLOAT` DEFAULT `1000` | Placeholder for faction meta Elo |

`Squad.eloRating` already existed in this project (`INT DEFAULT 1000`).

---

## Application Architecture

This project uses Next.js App Router with a repository/service/type layered architecture. Adapt the following to your stack.

### Type layer (`src/types/matchResult.model.ts`)

- `MATCH_OUTCOME` const: `{ A: 'A', B: 'B', D: 'D' }` — typed string constants, no DB enum needed.
- `MatchResultSquadInfo` type: lightweight nested squad info for display (`squadId`, `squadName`, `userId`, `userName`).
- `MatchResultPlain` type: serialisable plain object (all fields + nested squad info).
- `MatchResult` class: constructor, `isPending` / `isConfirmed` getters, `toPlain()` method.

Also add `eloRating?: number` to the `User` and `SquadType` type classes and their plain/constructor types.

Export the new type from the types index.

### Repository layer (`src/repositories/matchResult.repository.ts`)

Methods:

| Method | Description |
| --- | --- |
| `createMatchResult({ squadAId, squadBId, result })` | Creates a pending match record |
| `getMatchResult(matchResultId)` | Fetches one record with squad+user relations |
| `getPendingMatchesForUser(userId)` | Records where `squadBConfirmed = false` AND `squadB.userId = userId` |
| `getMatchHistoryForSquad(squadId)` | Confirmed records where squad is either squadA or squadB, ordered by `matchDate DESC` |
| `confirmMatch(matchResultId)` | Sets `squadBConfirmed = true` |
| `deleteMatchResult(matchResultId)` | Hard delete (dispute) |

All queries include nested squad → user relations (to get `userName` for display).

### Service layer (`src/services/matchResult.service.ts`)

Static methods wrapping the repository with business logic:

| Method | Validates |
| --- | --- |
| `createPendingMatch(squadAId, squadBId, result, userId)` | Result is `"A"/"B"/"D"`, user owns squadA, not a self-match |
| `confirmMatch(matchResultId, userId)` | User owns squadB, not already confirmed |
| `disputeMatch(matchResultId, userId)` | User owns squadB, not already confirmed |
| `getPendingMatchesForUser(userId)` | — |
| `getMatchHistoryForSquad(squadId)` | — |

### API routes

| Route | Method | Auth | Description |
| --- | --- | --- | --- |
| `/api/match-results` | `POST` | Required | Create pending match. Body: `{ squadAId, squadBId, result }` |
| `/api/match-results/pending` | `GET` | Required | All pending matches awaiting current user's confirmation |
| `/api/match-results/history/[squadId]` | `GET` | Public | Confirmed match history for a squad |
| `/api/match-results/[matchResultId]/confirm` | `PATCH` | Required | Confirm a match (squadB owner only) |
| `/api/match-results/[matchResultId]` | `DELETE` | Required | Dispute/cancel a match (squadB owner only) |
| `/api/squads/search?q=term` | `GET` | Public | Search squads by name or username (for opponent picker modal). Returns `squadId`, `squadName`, `userId`, `userName`, `squadTypeName`. Min 2 chars, max 20 results. |

All write endpoints return the updated/created record as JSON on success, or a plain-text error message with an appropriate HTTP status on failure.

---

## W/L/D Count Logic

Counts are computed from the history array in the client (or can be done in a DB query). From a given squad's perspective:

```
wins   = records where (squadAId = X AND result = "A") OR (squadBId = X AND result = "B")
losses = records where (squadAId = X AND result = "B") OR (squadBId = X AND result = "A")
draws  = records where result = "D"
```

---

## UI Components

### `BattlesTab` component (`src/components/squad/BattlesTab.tsx`)

Props: `squadId`, `squadName`, `isOwner`, `userId`

On mount, fetches:
- `GET /api/match-results/history/[squadId]` — confirmed history
- `GET /api/match-results/pending` (owner only) — filters client-side to `squadBId === squadId`

Sections rendered:
1. **W/L/D summary row** — large stat numbers with a refresh button (re-runs both fetches) and "Record Battle" button (owner only)
2. **Pending confirmations** — only visible to owner, shows unconfirmed incoming results with Confirm / Dispute buttons
3. **Battle history** — W/L/D label + opponent name + date, one row per confirmed match

### `RecordBattleModal` (inline in BattlesTab)

- Debounced search field calls `/api/squads/search` to find opponent squads (excludes own squads and self-owned squads)
- Three result buttons: I Won / Draw / They Won (maps to `"A"` / `"D"` / `"B"`)
- On submit: `POST /api/match-results`, then calls `onRecorded` callback with the created record and shows a toast

### Squad detail page integration

Add a tab bar above the squad (centered, matching existing tab style in the app). Two tabs: **Units** (existing content) and **Battles** (renders `BattlesTab`). Tab state is local `useState` — no URL change needed.

---

## Elo — Future Implementation Notes

All match records store `matchDate`. When ready to compute Elo:

1. Fetch all confirmed matches for a squad/user/squad-type, sorted by `matchDate ASC`.
2. Replay in order starting from rating `1000`, applying standard Elo formula:
   ```
   K = 32  (squads/users),  16  (squad types — slower moving)
   score = 1 (win), 0.5 (draw), 0 (loss)
   expected(A) = 1 / (1 + 10^((rB - rA) / 400))
   new(A) = rA + K * (score - expected(A))
   ```
3. To avoid cascade recalculation across all players, use the **stored `eloBeforeB` snapshot** (opponent's rating at time of that match) when replaying a squad's history — each squad's chain recalculates independently.
4. Write final ratings to `Squad.eloRating`, `User.eloRating`, `SquadType.eloRating` and update `eloBeforeA/B` + `eloAfterA/B` on each match record.

A stored procedure or one-off script can backfill ratings across all existing history without touching application code.
