import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { useGetPokemonQueryOptions } from '@/queries/useGetPokemonQuery';
import PokemonDetails from './_components/PokemonDetails';

export const metadata: Metadata = {
  title: 'Pokemon Details',
};

interface PokemonDetailsPageProps {
  /**
   * The parameters for the page
   */
  params: Promise<{
    /**
     * The ID of the Pokémon to fetch
     */
    id: string;
  }>;
}

export default async function PokemonDetailsPage({ params }: PokemonDetailsPageProps) {
  const queryClient = new QueryClient();

  const { id } = await params;

  await queryClient.prefetchQuery(useGetPokemonQueryOptions(id));

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-2">
      <main className="flex flex-1 flex-col justify-center items-center py-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Pokémon Details</h1>
        </div>

        <div className="w-full max-w-4xl">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <PokemonDetails pokemonId={id} />
          </HydrationBoundary>
        </div>
      </main>
    </div>
  );
}
