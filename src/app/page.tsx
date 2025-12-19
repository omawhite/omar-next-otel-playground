import Header from "@/components/Header/Header";
import Link from "next/link";
import PokemonList from "./_components/PokemonList";

const POKEMON_HOME_URL = '/';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-2">
      <main className="flex flex-1 flex-col justify-center items-center py-5">
        <Header logoImgSrc="/images/pokeball.svg" logoLink={POKEMON_HOME_URL} />
        <h1 className="m-0 text-heading-xxxl leading-heading text-center text-primary">
          Welcome to Omar's Pokedex!
        </h1>
        <br />
        <div className="flex justify-center mb-8">
          <Link
            href="/search"
            className="px-8 py-4 bg-[#DC0A2D] text-white rounded-lg text-lg font-semibold hover:bg-[#B00822] transition-colors shadow-lg"
          >
            Search Pokemon
          </Link>
        </div>
        <PokemonList />
      </main>
    </div>
  );
}
