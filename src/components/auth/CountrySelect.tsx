import { forwardRef } from "react";
import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ASEAN_COUNTRIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
}

export const CountrySelect = forwardRef<HTMLButtonElement, CountrySelectProps>(
  ({ value, onChange, placeholder = "Select country", disabled, error }, ref) => {
    return (
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger
          ref={ref}
          className={cn(
            "h-12 px-4 text-base bg-background border-border/60 hover:border-primary/40 focus:border-primary transition-colors duration-200",
            error && "border-destructive focus:border-destructive"
          )}
        >
          <div className="flex items-center gap-3">
            <Globe className="w-4 h-4 text-muted-foreground shrink-0" />
            <SelectValue placeholder={placeholder} />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-card border-border/80 shadow-xl max-h-[280px]">
          {ASEAN_COUNTRIES.map((country) => (
            <SelectItem
              key={country.code}
              value={country.name}
              className="py-3 px-4 cursor-pointer focus:bg-primary/5 focus:text-foreground"
            >
              <span className="font-medium">{country.name}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
);

CountrySelect.displayName = "CountrySelect";
