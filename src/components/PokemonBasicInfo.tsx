import type { Pokemon } from '@/types/pokemon';

interface PokemonBasicInfoProps {
  pokemon: Pokemon;
  layout?: 'horizontal' | 'vertical';
  showId?: boolean;
}

export function PokemonBasicInfo({ pokemon, layout = 'horizontal', showId = true }: PokemonBasicInfoProps) {
  const containerClasses = layout === 'horizontal' ? 'grid grid-cols-2 gap-4' : 'space-y-4';

  return (
    <div className={containerClasses}>
      <div>
        <p className="text-sm text-gray-500">Height</p>
        <p className="font-semibold">{pokemon.height / 10}m</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Weight</p>
        <p className="font-semibold">{pokemon.weight / 10}kg</p>
      </div>
      {showId && (
        <div className={layout === 'horizontal' ? 'col-span-2' : ''}>
          <p className="text-sm text-gray-500">ID</p>
          <p className="font-semibold">#{pokemon.id.toString().padStart(3, '0')}</p>
        </div>
      )}
    </div>
  );
}
