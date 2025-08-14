import { ProductCard } from "@/components/product-card"
import type { Product } from "@/components/product-catalog"

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg mb-4">Nenhum produto encontrado</p>
        <p className="text-sm text-muted-foreground">Tente ajustar os filtros ou buscar por outros termos</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
