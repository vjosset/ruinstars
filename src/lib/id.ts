import { customAlphabet } from 'nanoid'

const ALPHANUMERIC_ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

const generatorCache = new Map<number, () => string>()

export function generateId(size = 10): string {
  if (!generatorCache.has(size)) {
    generatorCache.set(size, customAlphabet(ALPHANUMERIC_ALPHABET, size))
  }

  const generator = generatorCache.get(size)
  if (!generator) {
    throw new Error('Failed to initialize ID generator')
  }

  return generator()
}
