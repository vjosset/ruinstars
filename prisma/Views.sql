ALTER VIEW view_UnitTypePower
AS
SELECT
  ut.squadtypeid,
  ut.unitTypeId,
  ut.unitTypeName,
  ut.act,
  ut.arm,
  ut.hit,
  ut.gp,
  
  ROUND(
    (ut.hit * 1.5) +                 -- HIT
    (ut.arm * 1.2) +           -- ARM
    (ut.act * 2) +                   -- ACT
    #COALESCE(SUM(w.att * (CASE w.TYP WHEN 'R' THEN ut.RSK ELSE ut.MSK END) / 6), 0),  -- Weapon score
    GREATEST(ut.RSK, ut.MSK) * 1.0,
    2
  ) AS power

FROM UnitType ut
LEFT JOIN Gear w ON CONCAT(',', ut.gearids, ',') LIKE CONCAT('%,', w.gearid, ',%')
AND w.geartype = 'W'
GROUP BY
  ut.squadtypeid,
  ut.unitTypeId,
  ut.unitTypeName,
  ut.act,
  ut.arm,
  ut.hit,
  ut.gp
ORDER BY power DESC;

ALTER VIEW view_WeaponPower
AS
SELECT
	G.gearId,
    G.TYP,
    G.ATT,
    G.special,
    G.isdefault,
    G.GP,
    ROUND
    (
		((G.ATT - (CASE TYP WHEN 'M' THEN 1 ELSE 0 END)) * 1.2) +
        SUM(COALESCE(S.offsetGP, 0) * 2),
        2
	)
    AS power
FROM
	Gear G
    LEFT JOIN Special S
		ON  G.special LIKE CONCAT('%', REPLACE(S.code, '_', '%'), '%')
WHERE
	G.gearType = 'W'
GROUP BY
	G.gearId,
    G.TYP,
    G.ATT,
    G.special,
    G.isdefault,
    G.GP,
    G.TYP;
