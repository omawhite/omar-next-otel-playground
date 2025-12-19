import type { Pokemon } from '@/types/pokemon';

interface PokemonStatsProps {
  stats: Pokemon['stats'];
  showBars?: boolean;
  layout?: 'compact' | 'detailed';
}

export function PokemonStats({ stats, showBars = true, layout = 'detailed' }: PokemonStatsProps) {
  if (layout === 'compact') {
    return (
      <div className="grid grid-cols-2 gap-2 text-sm">
        {stats.slice(0, 4).map((stat) => (
          <div key={stat.stat.name} className="flex justify-between">
            <span className="capitalize text-gray-600">{stat.stat.name.replace('-', ' ')}</span>
            <span className="font-medium">{stat.base_stat}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {stats.map((stat) => (
        <div key={stat.stat.name} className="flex justify-between items-center">
          <span className="text-sm capitalize">{stat.stat.name.replace('-', ' ')}</span>
          <div className="flex items-center gap-2">
            {showBars && (
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(stat.base_stat / 255) * 100}%` }} />
              </div>
            )}
            <span className="text-sm font-medium w-8 text-right">{stat.base_stat}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
