/*
 RESILIENCE: How much damage an opponent needs to deal to a squad to TPK it, based on HIT and ARM
 Does not take into account Dodge (melee save reroll) or Tough (ranged save reroll)
*/
SELECT squadid, SUM(Resilience) AS TotalResilience, AVG(Resilience) AS AvgResilience
FROM
(
  SELECT
    S.squadId, S.squadName, ST.squadTypeName,
    U.unitName, UT.unitTypeName,
    UT.ARM, UT.HIT,
    UT.HIT * (6.0 / (6 - UT.ARM)) AS Resilience
  FROM
    Squad S
      INNER JOIN SquadType ST
      ON  ST.squadTypeId = S.squadTypeId
    INNER JOIN Unit U
      ON  U.squadId = S.squadId
    INNER JOIN UnitType UT
      ON  UT.unitTypeId = U.unitTypeID
  WHERE
    S.userid = 'ruinstars'
) A
GROUP BY
  squadid;

/*
  POWER: Overall quality/power score for a squad. Incomplete, does not reflect reality
*/
SELECT
	U.UnitTypeID, UTP.ACT, UTP.ARM, UTP.HIT, UTP.MSK, UTP.RSK, UTP.GP,
  UTP.power AS UnitPower,
  SUM(COALESCE(W.power * ((CASE W.TYP WHEN 'M' THEN UTP.MSK ELSE UTP.RSK END) / 3.0), 0)) AS ScaledWeaponPower
FROM
	Squad S
	INNER JOIN Unit U
		ON  U.squadid = S.squadid
	INNER JOIN view_UnitTypePower UTP
		ON  UTP.unitTypeId = U.unitTypeID
	LEFT JOIN view_WeaponPower W
		ON  CONCAT(',', U.gearids, ',') LIKE CONCAT('%,', W.gearid, ',%')
WHERE
	S.userid = 'ruinstars'
GROUP BY
	S.squadid,
	U.unitTypeId,
	U.unitid,
	UTP.MSK,
	UTP.RSK
ORDER BY
  S.SquadID, U.seq;
