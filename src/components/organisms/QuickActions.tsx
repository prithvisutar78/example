import { Button } from "@/components/atoms/Button";
import { FileText, PackagePlus, ShoppingCart } from "lucide-react";

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button>
        <PackagePlus className="h-4 w-4" /> Add Product
      </Button>
      <Button variant="secondary">
        <ShoppingCart className="h-4 w-4" /> Create PO
      </Button>
      <Button variant="secondary">
        <FileText className="h-4 w-4" /> Generate Report
      </Button>
    </div>
  );
}
