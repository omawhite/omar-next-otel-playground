import type { Metadata } from 'next';
import PokemonSearch from './_components/PokemonSearch';

export const metadata: Metadata = {
  title: 'Pokémon Search',
  icons: {
    icon: '/images/favicon.ico',
  },
};

interface PokemonSearchPageProps {
  searchParams: Promise<{
    id?: string;
    name?: string;
  }>;
}

export default async function PokeSearchPage({ searchParams }: PokemonSearchPageProps) {
  const params = await searchParams;

  // Determine initial search term from URL parameters
  // Prioritize 'id' over 'name' if both are present
  const initialSearchTerm = params.id || params.name || '';

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-2">
      <main className="flex flex-1 flex-col justify-center items-center py-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Search Pokémon</h1>
          <p className="text-lg text-muted-foreground">Search for Pokémon by name or number using the PokéAPI</p>
        </div>
        <PokemonSearch initialSearchTerm={initialSearchTerm} />
      </main>
    </div>
  );
}