'use client';

import useGetPokemonQuery from '@/queries/useGetPokemonQuery';
import { PokemonDetailedCard } from './PokemonDetailedCard';

interface PokemonDetailsProps {
  /**
   * The ID of the Pokémon to display
   */
  pokemonId: string;
}

/**
 * A component for fetching and displaying detailed information about a Pokémon using React Query.
 *
 * @see {@link PokemonDetailedCard} for the component that displays the Pokémon details.
 */
export default function PokemonDetails({ pokemonId }: PokemonDetailsProps) {
  const pokemonQuery = useGetPokemonQuery(pokemonId);

  const { data, isLoading, isError } = pokemonQuery;

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4" />
        <p className="text-gray-500">Loading Pokemon details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600">
        <p>{pokemonQuery.error instanceof Error ? pokemonQuery.error.message : 'Failed to fetch Pokemon data'}</p>
      </div>
    );
  }

  if (data) {
    return <PokemonDetailedCard pokemon={data} />;
  }

  return (
    <div className="text-center">
      <p>No data available</p>
    </div>
  );
}
