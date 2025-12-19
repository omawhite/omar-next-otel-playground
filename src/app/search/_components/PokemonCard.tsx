import Link from 'next/link';
import { PokemonBasicInfo } from '@/components/PokemonBasicInfo';
import { PokemonImage } from '@/components/PokemonImage';
import type { Pokemon } from '@/types/pokemon';

interface PokemonCardProps {
  /**
   * The Pokémon data to display
   */
  pokemon: Pokemon;
}

/**
 * A card component for displaying Pokémon information.
 */
export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 capitalize mb-2">{pokemon.name}</h2>
        <p className="text-gray-600 mb-4">#{pokemon.id.toString().padStart(3, '0')}</p>

        <div className="mb-4">
          <PokemonImage pokemon={pokemon} size="medium" className="mx-auto" />
        </div>

        <div className="mb-4">
          <PokemonBasicInfo pokemon={pokemon} layout="horizontal" showId={false} />
        </div>

        <Link href={`/pokemon/${pokemon.id}`} className="text-black font-medium">
          Details
        </Link>
      </div>
    </div>
  );
}
