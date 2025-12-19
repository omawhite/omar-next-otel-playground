import Image from 'next/image';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { ModeToggle } from '@/components/theme-toggle';

export default function Navbar() {
  return (
    <nav className="w-full bg-card border-b border-border py-4 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/pokeball.svg"
            alt="Pokemon Logo"
            width={32}
            height={32}
            className="hover:opacity-80 transition-opacity"
          />
          <span className="text-xl font-bold text-foreground">Omar's Pokedex</span>
        </Link>
        <div className="flex items-center gap-4">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/" className="text-primary hover:text-primary/80 underline text-lg font-medium">
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/search" className="text-primary hover:text-primary/80 underline text-lg font-medium">
                    Search
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
