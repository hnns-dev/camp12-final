/**
 * Returns a random element from the given array.
 * @param array The array to select a random element from.
 * @returns A random element from the array, or undefined if the array is empty.
 */
export function getRandomElement<T>(array: T[]): T | undefined {
  if (array.length === 0) {
    return undefined;
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
