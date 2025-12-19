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
    <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 max-w-md mx-auto border border-border">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-card-foreground capitalize mb-2">{pokemon.name}</h2>
        <p className="text-muted-foreground mb-4">#{pokemon.id.toString().padStart(3, '0')}</p>

        <div className="mb-4">
          <PokemonImage pokemon={pokemon} size="medium" className="mx-auto" />
        </div>

        <div className="mb-4">
          <PokemonBasicInfo pokemon={pokemon} layout="horizontal" showId={false} />
        </div>

        <Link
          href={`/pokemon/${pokemon.id}`}
          className="inline-flex items-center justify-center rounded-md bg-blue-600 dark:bg-blue-500 text-white font-medium px-4 py-2 text-sm hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Details
        </Link>
      </div>
    </div>
  );
}
