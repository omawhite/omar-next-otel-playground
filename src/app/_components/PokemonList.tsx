'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useId, useState } from 'react';
import usePokemonListQuery from '@/queries/usePokemonListQuery';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

/**
 * Demonstrates how to use React Query to fetch multiple Pokémon.
 */
export default function PokemonList() {
  // State for number of Pokemon to fetch
  const [pokemonCount, setPokemonCount] = useState(5);

  // Predefined options for the dropdown
  const countOptions = [5, 10, 25, 50, 100, 150, 151];

  // Generate unique ID for the select element
  const selectId = useId();

  // Fetch all Pokemon using the custom hook
  const pokemonQueries = usePokemonListQuery(pokemonCount);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground text-center sm:text-right">Pokémon #1 - {pokemonCount}</h2>
        <div className="mb-4 sm:mb-0">
          <label htmlFor={selectId} className="block text-sm font-medium text-foreground mb-2">
            Number of Pokemon to display:
          </label>
          <select
            id={selectId}
            value={pokemonCount}
            onChange={(e) => setPokemonCount(Number(e.target.value))}
            className="block w-full max-w-xs px-3 py-2 bg-background text-foreground border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring sm:text-sm"
          >
            {countOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {pokemonQueries.map((query, index) => {
          // Destructure the query object to get the data, loading state, and error state
          const { data, isLoading, isError } = query;
          const { name, id, sprites } = data ?? {};
          const key = name || `no-name-${index}`;

          // Get the best available image
          const pokemonImage = sprites?.other?.['official-artwork']?.front_default || sprites?.front_default;

          return (
            <div key={key}>
              {isLoading ? (
                <Card className="aspect-square">
                  <CardContent className="flex flex-col items-center justify-center h-full">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary mb-2" />
                    <span className="text-muted-foreground text-sm text-center">Loading...</span>
                  </CardContent>
                </Card>
              ) : isError ? (
                <Card className="aspect-square">
                  <CardContent className="flex flex-col items-center justify-center h-full">
                    <span className="text-destructive text-sm text-center">Error loading Pokemon #{index + 1}</span>
                  </CardContent>
                </Card>
              ) : data ? (
                <Link
                  href={`/pokemon/${id}`}
                  className="block aspect-square"
                >
                  <Card className="h-full hover:shadow-md hover:border-primary/50 transition-all duration-200">
                    <CardContent className="flex flex-col items-center justify-center h-full">
                      <div className="shrink-0 mb-3">
                        {pokemonImage ? (
                          <Image
                            src={pokemonImage}
                            alt={name || 'Pokemon'}
                            width={80}
                            height={80}
                            className="w-20 h-20 object-contain"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                            <span className="text-muted-foreground text-xs">No Image</span>
                          </div>
                        )}
                      </div>
                      <div className="text-center">
                        <CardTitle className="capitalize text-sm mb-1">{name}</CardTitle>
                        <CardDescription className="text-xs">#{id}</CardDescription>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ) : (
                <Card className="aspect-square">
                  <CardContent className="flex items-center justify-center h-full">
                    <span className="text-muted-foreground text-sm">No data available</span>
                  </CardContent>
                </Card>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
