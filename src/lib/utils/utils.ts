export function toLocalIsoDate(date: Date): string {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return local.toISOString().split('T')[0] // YYYY-MM-DD
}

export function getRandom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function ucwords(str: string): string {
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}

export function sanitizeFileName(fileName: string): string {
  // Remove any character that isn't a letter, number, space, or hyphen
  return fileName
    .replace(/[^\w\s-]/g, '') // Remove non-alphanumeric characters (except spaces and hyphens)
    .replace(/[\s_-]+/g, '_') // Replace spaces or multiple underscores with a single underscore
    .toLowerCase() // Optionally make it lowercase for consistency
}
