import type { Pokemon } from '@/types/pokemon';

interface PokemonAbilitiesProps {
  abilities: Pokemon['abilities'];
  layout?: 'compact' | 'detailed';
}

export function PokemonAbilities({ abilities, layout = 'detailed' }: PokemonAbilitiesProps) {
  if (layout === 'compact') {
    return (
      <div className="space-y-1">
        {abilities.slice(0, 2).map((ability) => (
          <div key={ability.slot} className="text-sm">
            <span className="capitalize">{ability.ability.name.replace('-', ' ')}</span>
            {ability.is_hidden && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-1 py-0.5 rounded ml-2">Hidden</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {abilities.map((ability) => (
        <div key={ability.slot} className="flex justify-between items-center">
          <span className="capitalize">{ability.ability.name.replace('-', ' ')}</span>
          {ability.is_hidden && <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Hidden</span>}
        </div>
      ))}
    </div>
  );
}
