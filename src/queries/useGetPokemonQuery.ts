import { queryOptions, useQuery } from '@tanstack/react-query';
import getPokemon, { getPokemonQueryKey } from '@/requests/getPokemon';
import type { Pokemon } from '@/types/pokemon';

/**
 * React Query options for fetching Pokémon data from the PokeAPI
 *
 * @param query - The name or ID of the Pokémon to fetch (case-insensitive)
 * @returns A React Query options object
 */
export const useGetPokemonQueryOptions = (query: string) =>
  queryOptions({
    queryKey: [getPokemonQueryKey, query],
    queryFn: () => getPokemon(query),
    enabled: !!query.trim(),
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

/**
 * React Query hook for fetching Pokémon data from the PokeAPI
 *
 * @param query - The name or ID of the Pokémon to fetch (case-insensitive)
 * @returns A React Query result object containing the Pokémon data, loading state, and error information
 *
 * @remarks
 * - The query is automatically disabled when the query string is empty or only contains whitespace
 * - Failed requests are retried once before giving up
 * - Data is considered fresh for 5 minutes, after which it will be re-fetched in the background
 * - The hook uses the `getPokemonQueryKey` constant for consistent cache key generation
 * - Error handling includes both network errors and 404 "Pokémon not found" responses
 *
 * @see {@link getPokemon} - The underlying API function used for queryFn
 * @see {@link Pokemon} - The TypeScript interface for Pokémon data
 */
function useGetPokemonQuery(query: string) {
  return useQuery(useGetPokemonQueryOptions(query));
}

export default useGetPokemonQuery;
