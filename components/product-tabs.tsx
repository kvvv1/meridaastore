"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProductTabsProps {
  product: {
    details: string[]
    care: string[]
  }
}

export function ProductTabs({ product }: ProductTabsProps) {
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="details">Detalhes</TabsTrigger>
        <TabsTrigger value="care">Cuidados</TabsTrigger>
      </TabsList>
      <TabsContent value="details" className="mt-6">
        <div className="space-y-4">
          <h3 className="font-medium">Informações do Produto</h3>
          <ul className="space-y-2">
            {product.details.map((detail, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                • {detail}
              </li>
            ))}
          </ul>
        </div>
      </TabsContent>
      <TabsContent value="care" className="mt-6">
        <div className="space-y-4">
          <h3 className="font-medium">Instruções de Cuidado</h3>
          <ul className="space-y-2">
            {product.care.map((instruction, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                • {instruction}
              </li>
            ))}
          </ul>
        </div>
      </TabsContent>
    </Tabs>
  )
}
