import { Search, Heart, User, Moon, Sun, Keyboard, Menu } from "lucide-react";
import { Input } from "./ui/input";
import { useTheme } from "./ThemeProvider";
import { useSavedTools } from "./SavedToolsContext";
import { Logo } from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchBar } from "./layout/search-bar";

interface HeaderProps {
  onShortcutsClick?: () => void;
  onMenuClick?: () => void;
  onMobileSearchClick?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

interface HeaderProps {
  onShortcutsClick?: () => void;
  onMenuClick?: () => void;
  onMobileSearchClick?: () => void;
}
 
export function Header({
  onShortcutsClick,
  onMenuClick,
  onMobileSearchClick,
  searchQuery = "",
  onSearchChange,
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { savedTools } = useSavedTools();
  const savedCount = savedTools.length;
  const pathname = usePathname();
  return (
    <header className="bg-white dark:bg-card/50 backdrop-blur-sm border-b border-gray-200 dark:border-border px-3 sm:px-6 py-3 sm:py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 text-gray-600 dark:text-muted-foreground hover:text-[#0F5F6A] dark:hover:text-primary transition-colors"
            title="Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Logo width={28} height={28} className="sm:w-8 sm:h-8" />
            <span className="text-lg sm:text-xl font-medium text-[#0F5F6A] dark:text-primary">
              IechoAI
            </span>
          </div>

          {/* Tagline */}
          <div className="hidden lg:block text-sm text-gray-600 dark:text-muted-foreground ml-4">
            Empowering lives through Tech
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
          {onSearchChange ? (
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
            />
          ) : (
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Monkey tools..."
                className="pl-10 bg-gray-50 dark:bg-input-background border-gray-200 dark:border-border focus:border-[#0F5F6A] dark:focus:border-primary focus:ring-[#0F5F6A] dark:focus:ring-primary"
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Search Button */}
          <button
            onClick={onMobileSearchClick}
            className="md:hidden p-2 text-gray-600 dark:text-muted-foreground hover:text-[#0F5F6A] dark:hover:text-primary transition-colors"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={onShortcutsClick}
            className="hidden lg:block p-2 text-gray-600 dark:text-muted-foreground hover:text-[#0F5F6A] dark:hover:text-primary transition-colors"
            title="Keyboard Shortcuts (Shift + ?)"
          >
            <Keyboard className="w-5 h-5" />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-600 dark:text-muted-foreground hover:text-[#0F5F6A] dark:hover:text-primary transition-colors"
            title={theme === "dark" ? "Light Mode" : "Dark Mode"}
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <Link
            href="/saved"
            className={`p-2 transition-colors relative ${
              pathname === "/saved"
                ? "text-[#0F5F6A] dark:text-primary"
                : "text-gray-600 dark:text-muted-foreground hover:text-[#0F5F6A] dark:hover:text-primary"
            }`}
            title="Saved Tools"
          >
            <Heart
              className={`w-5 h-5 ${
                pathname === "/saved" ? "fill-current" : ""
              }`}
            />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {savedCount > 9 ? "9+" : savedCount}
              </span>
            )}
          </Link>
          {/* <Link
            href="/profile"
            className={`p-2 transition-colors ${
              pathname === "/profile"
                ? "text-[#0F5F6A] dark:text-primary"
                : "text-gray-600 dark:text-muted-foreground hover:text-[#0F5F6A] dark:hover:text-primary"
            }`}
            title="Profile"
          >
            <User className="w-5 h-5" />
          </Link> */}
        </div>
      </div>
    </header>
  );
}
