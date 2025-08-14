"use client"

import Head from "next/head"

interface Product {
  id: number
  name: string
  description?: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating?: number
  reviews?: number
  inStock?: boolean
}

interface SEOSchemaProps {
  type: "website" | "product" | "organization" | "breadcrumb"
  data?: {
    product?: Product
    breadcrumbs?: Array<{ name: string; url: string }>
  }
}

export function SEOSchema({ type, data }: SEOSchemaProps) {
  const generateSchema = () => {
    const baseUrl = "https://mfstoregirls.com.br"

    switch (type) {
      case "website":
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "MF Store Girls",
          description: "E-commerce premium de moda feminina com as últimas tendências e peças exclusivas",
          url: baseUrl,
          potentialAction: {
            "@type": "SearchAction",
            target: `${baseUrl}/produtos?busca={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }

      case "organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "MF Store Girls",
          description: "Loja online de moda feminina premium",
          url: baseUrl,
          logo: `${baseUrl}/mf-store-logo.jpg`,
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+55-11-99999-9999",
            contactType: "customer service",
            availableLanguage: "Portuguese",
          },
          sameAs: ["https://www.instagram.com/mfstoregirls", "https://www.facebook.com/mfstoregirls"],
        }

      case "product":
        if (!data?.product) return null
        const product = data.product
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description || `${product.name} - Moda feminina premium`,
          image: `${baseUrl}${product.image}`,
          brand: {
            "@type": "Brand",
            name: "MF Store Girls",
          },
          category: product.category,
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "BRL",
            availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            seller: {
              "@type": "Organization",
              name: "MF Store Girls",
            },
          },
          aggregateRating:
            product.rating && product.reviews
              ? {
                  "@type": "AggregateRating",
                  ratingValue: product.rating,
                  reviewCount: product.reviews,
                  bestRating: 5,
                  worstRating: 1,
                }
              : undefined,
        }

      case "breadcrumb":
        if (!data?.breadcrumbs) return null
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: data.breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.name,
            item: `${baseUrl}${crumb.url}`,
          })),
        }

      default:
        return null
    }
  }

  const schema = generateSchema()

  if (!schema) return null

  return (
    <Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </Head>
  )
}
