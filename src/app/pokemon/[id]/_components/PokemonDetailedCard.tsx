import { PokemonAbilities } from '@/components/PokemonAbilities';
import { PokemonBasicInfo } from '@/components/PokemonBasicInfo';
import { PokemonImage } from '@/components/PokemonImage';
import { PokemonStats } from '@/components/PokemonStats';
import { PokemonTypes } from '@/components/PokemonTypes';
import type { Pokemon } from '@/types/pokemon';

interface PokemonDetailedCardProps {
  /**
   * The Pokémon data to display
   */
  pokemon: Pokemon;
  /**
   * The class name to apply to the card
   */
  className?: string;
}

/**
 * A component for displaying detailed information about a Pokémon.
 */
export function PokemonDetailedCard({ pokemon, className = '' }: PokemonDetailedCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto ${className}`}>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 capitalize mb-2">{pokemon.name}</h1>
        <p className="text-gray-600 text-lg mb-6">#{pokemon.id.toString().padStart(3, '0')}</p>

        <div className="mb-8">
          <PokemonImage pokemon={pokemon} size="large" className="mx-auto" />
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Types</h2>
          <PokemonTypes types={pokemon.types} layout="horizontal" size="medium" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Basic Information</h2>
          <PokemonBasicInfo pokemon={pokemon} layout="vertical" showId={false} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Abilities</h2>
          <PokemonAbilities abilities={pokemon.abilities} layout="detailed" />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Base Stats</h2>
        <PokemonStats stats={pokemon.stats} showBars={true} layout="detailed" />
      </div>

      <div className="mt-8 text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Total Stats</p>
            <p className="font-semibold text-lg">{pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0)}</p>
          </div>
          <div>
            <p className="text-gray-500">Average</p>
            <p className="font-semibold text-lg">
              {Math.round(pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0) / pokemon.stats.length)}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Highest Stat</p>
            <p className="font-semibold text-lg">{Math.max(...pokemon.stats.map((stat) => stat.base_stat))}</p>
          </div>
          <div>
            <p className="text-gray-500">Lowest Stat</p>
            <p className="font-semibold text-lg">{Math.min(...pokemon.stats.map((stat) => stat.base_stat))}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
