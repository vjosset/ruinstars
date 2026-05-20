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
GP = (ATT - 1) + SUM(special.GP)
```

- Melee weapons cost -1 GP baseline compared to equivalent ranged weapons
  - Melee is at a disadvantage since it requires getting close to the target
- Some specials cost more than others, and some may actually reduce GP Cost (like `RNG` and `HVY`).

### Ranged

```javascript
GP = ATT + SUM(special.GP)
```

- Some specials cost more than others, and some may actually reduce GP Cost (like `RNG` and `HVY`).
