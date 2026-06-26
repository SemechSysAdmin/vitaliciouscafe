import { Plus } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-store";

export function ProductCard({ product }: { product: Product }) {
  const add = useCart((state) => state.add);

  const handleAdd = () => {
    add({
      id: product.id,
      name: product.name,
      image: product.image,
      priceKobo: product.priceKobo,
    });
  };

  return (
    <article className="group hover-lift bg-card rounded-3xl overflow-hidden shadow-card border border-border/50 flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={768}
          height={768}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <span className="absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-semibold text-primary">
          {product.category}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-lg font-bold leading-tight">{product.name}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] uppercase tracking-wide font-semibold bg-secondary text-secondary-foreground rounded-full px-2 py-0.5"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <span className="font-display text-xl font-bold text-foreground">{product.price}</span>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-3 py-2 text-xs font-semibold hover:shadow-glow transition-shadow"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>
      </div>
    </article>
  );
}
