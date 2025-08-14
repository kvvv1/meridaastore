"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductSortProps {
  value: string
  onChange: (value: string) => void
}

export function ProductSort({ value, onChange }: ProductSortProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Ordenar por" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="relevance">Relevância</SelectItem>
        <SelectItem value="newest">Mais Recentes</SelectItem>
        <SelectItem value="price-low">Menor Preço</SelectItem>
        <SelectItem value="price-high">Maior Preço</SelectItem>
        <SelectItem value="rating">Melhor Avaliação</SelectItem>
      </SelectContent>
    </Select>
  )
}
