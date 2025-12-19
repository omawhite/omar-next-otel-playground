import Image from 'next/image';
import type { Pokemon } from '@/types/pokemon';

interface PokemonImageProps {
  pokemon: Pokemon;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function PokemonImage({ pokemon, size = 'medium', className = '' }: PokemonImageProps) {
  const imageUrl =
    pokemon.sprites.other['official-artwork'].front_default ||
    pokemon.sprites.front_default ||
    pokemon.sprites.front_shiny;

  const sizeMap = {
    small: { width: 96, height: 96 },
    medium: { width: 192, height: 192 },
    large: { width: 256, height: 256 },
  };

  const dimensions = sizeMap[size];

  if (!imageUrl) {
    return (
      <div
        className={`bg-gray-100 rounded-lg flex items-center justify-center ${className}`}
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        <span className="text-gray-400">No Image</span>
      </div>
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={pokemon.name}
      width={dimensions.width}
      height={dimensions.height}
      className={`object-contain ${className}`}
      priority
    />
  );
}
