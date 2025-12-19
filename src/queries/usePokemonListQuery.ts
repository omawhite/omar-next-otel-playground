import { useQueries } from '@tanstack/react-query';
import getPokemon, { getPokemonQueryKey } from '@/requests/getPokemon';
import type { Pokemon } from '@/types/pokemon';

/**
 * React Query hook for fetching multiple Pokémon data from the PokeAPI
 *
 * @param count - The number of Pokémon to fetch (fetches Pokémon with IDs 1 through count)
 * @returns An array of React Query result objects, each containing a single Pokémon's data, loading state, and error information
 *
 * @remarks
 * - Fetches Pokémon with IDs from 1 to count (inclusive)
 * - Requests are made in parallel
 * - Each Pokémon query is cached independently using the Pokémon's ID as part of the cache key
 * - Failed requests are retried once before giving up
 * - Data is considered fresh for 5 minutes, after which it will be re-fetched in the background
 * - All queries use the same `getPokemonQueryKey` constant for consistent cache key generation
 * - Error handling includes both network errors and 404 "Pokémon not found" responses
 *
 * @see {@link getPokemon} - The underlying API function used for queryFn
 * @see {@link Pokemon} - The TypeScript interface for Pokémon data
 */
export default function usePokemonListQuery(count: number) {
  return useQueries({
    queries: Array.from({ length: count }, (_, i) => ({
      queryKey: [getPokemonQueryKey, (i + 1).toString()],
      queryFn: () => getPokemon((i + 1).toString()),
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    })),
  });
}
