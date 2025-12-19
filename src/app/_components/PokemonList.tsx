'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useId, useState } from 'react';
import usePokemonListQuery from '@/queries/usePokemonListQuery';

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
        <h2 className="text-2xl font-bold text-gray-900 text-center sm:text-right">Pokémon #1 - {pokemonCount}</h2>
        <div className="mb-4 sm:mb-0">
          <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-2">
            Number of Pokemon to display:
          </label>
          <select
            id={selectId}
            value={pokemonCount}
            onChange={(e) => setPokemonCount(Number(e.target.value))}
            className="block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm aspect-square">
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mb-2" />
                    <span className="text-gray-500 text-sm text-center">Loading...</span>
                  </div>
                </div>
              ) : isError ? (
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm aspect-square">
                  <div className="flex flex-col items-center justify-center h-full">
                    <span className="text-red-600 text-sm text-center">Error loading Pokemon #{index + 1}</span>
                  </div>
                </div>
              ) : data ? (
                <Link
                  href={`/pokemon/${id}`}
                  className="block bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 aspect-square"
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="flex-shrink-0 mb-3">
                      {pokemonImage ? (
                        <Image
                          src={pokemonImage}
                          alt={name || 'Pokemon'}
                          width={80}
                          height={80}
                          className="w-20 h-20 object-contain"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-900 capitalize text-sm mb-1">{name}</div>
                      <div className="text-xs text-gray-500">#{id}</div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm aspect-square">
                  <div className="flex items-center justify-center h-full">
                    <span className="text-gray-500 text-sm">No data available</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
