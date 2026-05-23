# GP Formulas

These are guidelines to calculating GP costs for Units and Weapons. Note that these are just guidelines, notably for UnitTypes where included gear, weapons, and skills should affect that unit type's cost.

## Units

```javascript
GP = max(
  0,
  (
    5 +
    ((`ACT` - 2) * 2) +
    ((`MSK` - 2) * 1) +
    ((`RSK` - 2) * 1) +
    ((`ARM` - 2) * 1) +
    ((`HIT` - 2) * 1)
  )
)
```

- **Baseline:** 5GP
  - For `ACT 2 MSK 2 RSK 2 ARM 2 HIT 2`
- **ACT:** 2GP/point above 2
- **MSK:** 1GP/point above 2
- **RSK:** 1GP/point above 2
- **ARM:** 1GP/point above 2
- **HIT:** 1GP/point above 2

## Weapons

### Melee

```javascript
GP = ATT + SUM(special.GP)
```

- Some specials cost more than others, and some may actually reduce GP Cost (like `RNG` and `HVY`).

### Ranged

```javascript
GP = (ATT + 1) + SUM(special.GP)
```

- Ranged weapons cost +1 GP baseline compared to equivalent melee weapons
  - Ranged is at a disadvantage since it does not require getting close to the target
- Some specials cost more than others, and some may actually reduce GP Cost (like `RNG` and `HVY`).

## Queries

### Weapon counts and stats

```sql
SELECT TYP, ATT, COUNT(*) FROM ruinstars.Gear WHERE geartype = 'W' AND TYP = 'R' GROUP BY TYP, ATT ORDER BY ATT;
SELECT TYP, ATT, COUNT(*) FROM ruinstars.Gear WHERE geartype = 'W' AND TYP = 'M' GROUP BY TYP, ATT ORDER BY ATT;
SELECT TYP, ATT, COUNT(*) FROM ruinstars.Gear WHERE geartype = 'W' AND gearid NOT LIKE 'HRD-%' AND gearid NOT LIKE 'NPC-%' GROUP BY TYP, ATT ORDER BY TYP, ATT;
```

### UnitType GP

```sql
SELECT UnitTypeId, GP, greatest(
  0,
  (
    5 +
    ((`ACT` - 2) * 2) +
    ((`MSK` - 2) * 1) +
    ((`RSK` - 2) * 1) +
    ((`ARM` - 2) * 1) +
    ((`HIT` - 2) * 1)
  )
) AS UnitCalcGP
FROM ruinstars.UnitType
WHERE unitTypeId NOT LIKE 'HRD-%' AND unitTypeId NOT LIKE 'NPC-%' AND UnitTypeId NOT LIKE 'FM-%';
```

### Weapon GP

```sql
SELECT G.gearId, G.ATT, G.Special, G.isDefault, G.GP,
  greatest(
    0,
    G.ATT + (CASE G.TYP WHEN 'M' THEN 0 ELSE '1' END)
  ) + SUM(COALESCE(S.offsetGP, 0))
    AS TotalCalcGP,
  greatest(
    0,
    G.ATT + (CASE G.TYP WHEN 'M' THEN 0 ELSE '1' END)
  ) AS BaseCalcGP,
  SUM(COALESCE(S.offsetGP, 0)) AS SpecialCalcGP
FROM Gear G
LEFT JOIN Special S
  ON  S.scope = 'W' 
    AND G.special LIKE REPLACE(S.code, '_', '%')
WHERE
  G.gearType = 'W' AND G.ATT IS NOT NULL
  AND G.gearId NOT LIKE 'HRD-%' AND G.gearId NOT LIKE 'NPC-%' AND G.gearId NOT LIKE 'FM-%'
GROUP BY
  G.gearId, G.GP, G.ATT, G.Special, G.isDefault;
```

### Unit GP with Default Weapons

```sql
SELECT
  UT.UnitTypeId, UT.GP AS UnitTypeCurrentGP,
  greatest(
    0,
    (
      5 + /* Baseline 5 GP per Unit */
      ((`ACT` - 2) * 2) + /* +2 GP per ACT above 2 */
      ((`MSK` - 2) * 1) + /* +1 GP per MSK above 2 */
      ((`RSK` - 2) * 1) + /* +1 GP per RSK above 2 */
      ((`ARM` - 2) * 1) + /* +1 GP per ARM above 2 */
      ((`HIT` - 2) * 1)   /* +1 GP per HIT above 2 */
    )
  ) AS UnitCalcGP,
  SUM(COALESCE(W.TotalCalcGP)) AS TotalDefaultWeaponsCalcGP,
  greatest(
    0,
    (
      5 + /* Baseline 5 GP per Unit */
      ((`ACT` - 2) * 2) + /* +2 GP per ACT above 2 */
      ((`MSK` - 2) * 1) + /* +1 GP per MSK above 2 */
      ((`RSK` - 2) * 1) + /* +1 GP per RSK above 2 */
      ((`ARM` - 2) * 1) + /* +1 GP per ARM above 2 */
      ((`HIT` - 2) * 1)   /* +1 GP per HIT above 2 */
    )
  ) + SUM(COALESCE(W.TotalCalcGP)) AS ExpectedUnitTypeGP
FROM
  ruinstars.UnitType UT
  LEFT JOIN # Get default weapons and their costs
    (
    SELECT G.gearId, G.ATT, G.Special, G.isDefault, G.GP,
      greatest(
        0,
        G.ATT + (CASE G.TYP WHEN 'M' THEN 0 ELSE '1' END)
      ) + SUM(COALESCE(S.offsetGP, 0))
      AS TotalCalcGP,
      greatest(
        0,
        G.ATT + (CASE G.TYP WHEN 'M' THEN 0 ELSE '1' END)
      ) AS BaseCalcGP,
      SUM(COALESCE(S.offsetGP, 0)) AS SpecialCalcGP
    FROM Gear G
    LEFT JOIN Special S
      ON  S.scope = 'W' 
      AND G.special LIKE REPLACE(S.code, '_', '%')
    WHERE
      G.gearType = 'W' AND G.ATT IS NOT NULL
      AND G.gearId NOT LIKE 'HRD-%' AND G.gearId NOT LIKE 'NPC-%' AND G.gearId NOT LIKE 'FM-%'
            AND G.isdefault = 1
    GROUP BY
      G.gearId, G.GP, G.ATT, G.Special, G.isDefault
  ) W 
    ON  CONCAT(',', UT.gearIds, ',') LIKE CONCAT('%,', W.gearid, ',%')
WHERE
  UT.unitTypeId NOT LIKE 'HRD-%' AND UT.unitTypeId NOT LIKE 'NPC-%' AND UT.UnitTypeId NOT LIKE 'FM-%'
GROUP BY
  UT.UnitTypeId, UT.GP, greatest(
    0,
    (
    5 +
    ((`ACT` - 2) * 2) +
    ((`MSK` - 2) * 1) +
    ((`RSK` - 2) * 1) +
    ((`ARM` - 2) * 1) +
    ((`HIT` - 2) * 1)
    )
  );
```
