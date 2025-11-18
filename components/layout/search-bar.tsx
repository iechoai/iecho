import { Search } from "lucide-react";
import { Input } from "../ui/input";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  placeholder = "Search tools...",
  className = "",
}: SearchBarProps) {
  return (
    <div className={`relative w-full ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-muted-foreground w-4 h-4" />
      <Input
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onSearchChange(e.target.value)
        }
        className="pl-10 bg-gray-50 dark:bg-input-background border-gray-200 dark:border-border focus:border-[#0F5F6A] dark:focus:border-primary focus:ring-[#0F5F6A] dark:focus:ring-primary"
      />
    </div>
  );
}
