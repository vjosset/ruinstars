/*
  For Grutak
*/

export function name_graxnuhk(): string {
  const rand = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

  const names1 = ['b', 'br', 'ch', 'd', 'dh', 'dr', 'g', 'gh', 'gr', 'hr', 'k', 'kh', 'kr', 'm', 'n', 'r', 'sk', 'sm', 'sn', 't', 'tr', 'v', 'vr', 'w', 'wr', 'z', 'zh', 'zr', '', '', '', '', '']
  const names2 = ['a', 'i', 'o', 'u', 'a', 'u']
  const names3 = ['b', 'd', 'dbr', 'dr', 'g', 'gb', 'gd', 'gg', 'gh', 'gn', 'gt', 'gz', 'hrbl', 'k', 'kg', 'kk', 'kt', 'lgr', 'nz', 'r', 'rb', 'rg', 'rgn', 'rgr', 'rk', 'rkr', 'rl', 'rz', 'sk', 'skr', 't', 'tgr', 'tzm', 'tzn', 'zdr', 'zg', 'zgr']
  const names4 = ['a', 'o', 'u']
  const names5 = ['d', 'g', 'gar', 'gas', 'gg', 'gus', 'k', 'kh', 'kk', 'm', 'nak', 'r', 'rd', 'rk', 'x', 'z', 'zak', 'zz',]

  return `${rand(names1)}${rand(names2)}${rand(names3)}${rand(names4)}${rand(names5)}`
}
