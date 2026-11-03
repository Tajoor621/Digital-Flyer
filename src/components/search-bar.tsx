import { Search } from "lucide-react";
import { Input } from "./ui/input";

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "دودھ، چاول، سبزی…  milk, rice, 🥬",
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className="relative"
    >
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
      <Input
        dir="auto"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-xl pl-10"
        aria-label="Search offers"
      />
    </form>
  );
}
