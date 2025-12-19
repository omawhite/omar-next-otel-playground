'use client';

import AlertBar from '@/components/AlertBar/AlertBar';
import Button from '@/components/Button/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useGetPokemonQuery from '@/queries/useGetPokemonQuery';
import { PokemonCard } from './PokemonCard';

interface PokemonSearchProps {
  /**
   * Initial search term to populate the search input
   */
  initialSearchTerm?: string;
}

/**
 * A search interface for finding Pokémon by name or ID number. Demonstrates how to use React Query to fetch a single Pokémon.
 */
function PokemonSearch({ initialSearchTerm = '' }: PokemonSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState(initialSearchTerm);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const pokemonQuery = useGetPokemonQuery(searchTerm);

  // Update both input and search term when initialSearchTerm changes (e.g., from URL params)
  useEffect(() => {
    if (initialSearchTerm) {
      setInputValue(initialSearchTerm);
      setSearchTerm(initialSearchTerm);
    } else {
      // Clear search when no initial term (URL was cleared)
      setInputValue('');
      setSearchTerm('');
    }
  }, [initialSearchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const trimmedQuery = inputValue.trim();
      setSearchTerm(trimmedQuery);

      // Update URL with the search term
      const params = new URLSearchParams(searchParams);
      // Check if the query looks like a number
      const isNumeric = /^\d+$/.test(trimmedQuery);

      if (isNumeric) {
        params.set('id', trimmedQuery);
        params.delete('name');
      } else {
        params.set('name', trimmedQuery);
        params.delete('id');
      }

      router.push(`?${params.toString()}`);
    }
  };

  const handleClear = () => {
    setInputValue('');
    setSearchTerm('');
    // Clear URL parameters
    router.push('/search');
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex flex-wrap gap-4 max-w-md mx-auto">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter Pokémon name or number..."
          className="flex-1 max-w-sm px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="flex gap-2 shrink-0">
          <Button type="submit">Search</Button>
          {searchTerm && (
            <Button type="button" onClick={handleClear}>
              Clear
            </Button>
          )}
        </div>
      </form>

      <div className="">
        {pokemonQuery.isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            <p className="mt-2 text-gray-600">Loading Pokémon...</p>
          </div>
        )}

        <AlertBar isOpen={pokemonQuery.isError}>
          {pokemonQuery.error instanceof Error ? pokemonQuery.error.message : 'Failed to fetch Pokémon data'}
        </AlertBar>

        {pokemonQuery.isSuccess && pokemonQuery.data && <PokemonCard pokemon={pokemonQuery.data} />}

        {!searchTerm && !pokemonQuery.isLoading && !pokemonQuery.isError && (
          <div className="text-center py-8">
            <p className="text-gray-600">Enter a Pokémon name or number to get started!</p>
            <p className="text-sm text-gray-500 mt-2">Try searching for "pikachu", "charizard", or "25"</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PokemonSearch;
