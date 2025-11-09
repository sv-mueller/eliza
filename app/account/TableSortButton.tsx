import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

type TableSortButtonProps = {
  sortDirection: "asc" | "desc" | false;
  toggleSorting: (desc: boolean) => void;
  label: string;
};
export function TableSortButton({
  sortDirection,
  toggleSorting,
  label,
}: TableSortButtonProps) {
  return (
    <Button
      variant="ghost"
      onClick={() => toggleSorting(sortDirection === "asc")}
    >
      {label}
      {!sortDirection ? (
        <ArrowUpDown />
      ) : sortDirection === "asc" ? (
        <ArrowUp />
      ) : (
        <ArrowDown />
      )}
    </Button>
  );
}
