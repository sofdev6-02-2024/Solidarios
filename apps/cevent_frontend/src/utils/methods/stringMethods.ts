/**
 * Capitalize the first letter of a word
 * @param word string to capitalize
 * @returns string with the first letter capitalized
 */
export function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
