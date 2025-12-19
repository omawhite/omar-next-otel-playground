import type { Pokemon } from '@/types/pokemon';

interface PokemonTypesProps {
  types: Pokemon['types'];
  layout?: 'horizontal' | 'vertical';
  size?: 'small' | 'medium';
}

export function PokemonTypes({ types, layout = 'horizontal', size = 'medium' }: PokemonTypesProps) {
  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1 text-sm',
  };

  const containerClasses = layout === 'horizontal' ? 'flex gap-2 justify-center' : 'space-y-2';

  return (
    <div className={containerClasses}>
      {types.map((type) => (
        <span
          key={type.slot}
          className={`bg-blue-100 text-blue-800 rounded-full font-medium capitalize ${sizeClasses[size]}`}
        >
          {type.type.name}
        </span>
      ))}
    </div>
  );
}
