import type { Pokemon } from "@/types/pokemon";

/**
 * Query key for the getPokemon query used in React Query
 */
export const getPokemonQueryKey = "getPokemon";

/**
 * Fetches Pokémon data from the PokeAPI
 *
 * @param query - The name or ID of the Pokémon to fetch (case-insensitive)
 * @returns A Promise that resolves to the Pokémon data
 * @throws {Error} When the Pokémon is not found (404) or when the API request fails
 *
 * @example
 * ```typescript
 * const pokemon = await getPokemon('pikachu');
 * console.log(pokemon.name); // 'pikachu'
 * ```
 */
async function getPokemon(query: string): Promise<Pokemon> {
  const normalizedQuery = query.toLowerCase().trim();

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${normalizedQuery}`,
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Pokémon "${query}" not found`);
    }
    throw new Error(`Failed to fetch Pokémon: ${response.statusText}`);
  }

  return response.json();
}

export default getPokemon;
