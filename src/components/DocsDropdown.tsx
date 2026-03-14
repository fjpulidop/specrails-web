import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { DOC_ENTRIES } from "@/lib/docs-registry";

export function DocsDropdown(): JSX.Element {
  const entries = DOC_ENTRIES.filter((d) => d.slug !== "");

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-sm text-muted-foreground hover:text-foreground h-auto px-0 py-0 font-normal">
            Docs
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-80 gap-1 p-3 bg-popover border border-border/30 rounded-xl shadow-xl">
              {entries.map((entry) => (
                <li key={entry.slug}>
                  <Link
                    to={`/docs/${entry.slug}`}
                    className="block rounded-lg px-3 py-2 hover:bg-dracula-current transition-colors group"
                  >
                    <div className="text-sm font-medium text-foreground group-hover:text-dracula-purple transition-colors">
                      {entry.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {entry.description}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
