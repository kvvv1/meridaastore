import { notFound } from "next/navigation"
import { ProductCatalog } from "@/components/product-catalog"

const categories = {
  vestidos: "Vestidos",
  blusas: "Blusas",
  calcas: "Calças",
  saias: "Saias",
  acessorios: "Acessórios",
  sapatos: "Sapatos",
  lingerie: "Lingerie",
  conjuntos: "Conjuntos",
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const categoryName = categories[params.slug as keyof typeof categories]

  if (!categoryName) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{categoryName}</h1>
          <p className="text-muted-foreground">
            Descubra nossa coleção exclusiva de {categoryName.toLowerCase()} premium
          </p>
        </div>
        <ProductCatalog category={params.slug} />
      </div>
    </div>
  )
}

export function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({
    slug,
  }))
}
