/**
 * Represents a Pokemon with all its associated data from the PokeAPI
 */
export interface Pokemon {
  /** The unique identifier for the Pokemon */
  id: number;
  /** The name of the Pokemon */
  name: string;
  /** The height of the Pokemon in decimeters */
  height: number;
  /** The weight of the Pokemon in hectograms */
  weight: number;
  /** Collection of sprite images for the Pokemon */
  sprites: {
    /** Default front-facing sprite URL */
    front_default: string | null;
    /** Shiny front-facing sprite URL */
    front_shiny: string | null;
    /** Additional sprite variants */
    other: {
      /** Official artwork sprite */
      "official-artwork": {
        /** Official artwork front-facing sprite URL */
        front_default: string | null;
      };
    };
  };
  /** Array of Pokemon types with their slot positions */
  types: Array<{
    /** The position of this type (1 or 2) */
    slot: number;
    /** Type information */
    type: {
      /** The name of the type (e.g., "fire", "water") */
      name: string;
      /** API URL for the type details */
      url: string;
    };
  }>;
  /** Array of Pokemon base stats */
  stats: Array<{
    /** The base value of the stat */
    base_stat: number;
    /** The effort value of the stat */
    effort: number;
    /** Stat information */
    stat: {
      /** The name of the stat (e.g., "hp", "attack") */
      name: string;
      /** API URL for the stat details */
      url: string;
    };
  }>;
  /** Array of Pokemon abilities */
  abilities: Array<{
    /** Ability information */
    ability: {
      /** The name of the ability */
      name: string;
      /** API URL for the ability details */
      url: string;
    };
    /** Whether this is a hidden ability */
    is_hidden: boolean;
    /** The slot position of this ability */
    slot: number;
  }>;
}

/**
 * Search parameters for Pokemon queries
 */
export interface PokemonSearchParams {
  /** The search query string to filter Pokemon by name */
  query: string;
}
