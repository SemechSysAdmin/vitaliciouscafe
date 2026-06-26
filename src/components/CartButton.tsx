import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-store";

export function CartButton({ onClick }: { onClick?: () => void }) {
  // Select only `items` so this re-renders on actual cart changes,
  // and derive count locally rather than calling the non-reactive
  // store helper function (see cart-store.ts itemCount()).
  const items = useCart((s) => s.items);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <Link
      to="/order"
      onClick={onClick}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted transition-colors"
      aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
    >
      <ShoppingCart className="w-5 h-5" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 grid place-items-center min-w-4.5 h-4.5 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold leading-none">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
