"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import type { FilterState } from "@/components/product-catalog"

interface ProductFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

const categories = [
  { id: "vestidos", label: "Vestidos" },
  { id: "blusas", label: "Blusas" },
  { id: "calcas", label: "Calças" },
  { id: "saias", label: "Saias" },
  { id: "blazers", label: "Blazers" },
  { id: "acessorios", label: "Acessórios" },
]

const colors = [
  { id: "preto", label: "Preto", color: "#000000" },
  { id: "branco", label: "Branco", color: "#FFFFFF" },
  { id: "azul", label: "Azul", color: "#1E40AF" },
  { id: "vermelho", label: "Vermelho", color: "#DC2626" },
  { id: "verde", label: "Verde", color: "#059669" },
  { id: "camel", label: "Camel", color: "#D2691E" },
  { id: "nude", label: "Nude", color: "#F5DEB3" },
  { id: "marinho", label: "Marinho", color: "#1E3A8A" },
]

const sizes = [
  { id: "P", label: "P" },
  { id: "M", label: "M" },
  { id: "G", label: "G" },
  { id: "GG", label: "GG" },
  { id: "36", label: "36" },
  { id: "38", label: "38" },
  { id: "40", label: "40" },
  { id: "42", label: "42" },
]

export function ProductFilters({ filters, onFiltersChange }: ProductFiltersProps) {
  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const toggleArrayFilter = (key: "category" | "colors" | "sizes", value: string) => {
    const currentArray = filters[key]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    updateFilter(key, newArray)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Filtros</h3>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-medium mb-3">Categoria</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={filters.category.includes(category.id)}
                onCheckedChange={() => toggleArrayFilter("category", category.id)}
              />
              <Label htmlFor={category.id} className="text-sm">
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Colors */}
      <div>
        <h4 className="font-medium mb-3">Cor</h4>
        <div className="grid grid-cols-4 gap-2">
          {colors.map((color) => (
            <div key={color.id} className="flex flex-col items-center space-y-1">
              <button
                onClick={() => toggleArrayFilter("colors", color.id)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  filters.colors.includes(color.id)
                    ? "border-primary scale-110"
                    : "border-border hover:border-primary/50"
                }`}
                style={{ backgroundColor: color.color }}
                title={color.label}
              />
              <span className="text-xs text-center">{color.label}</span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Sizes */}
      <div>
        <h4 className="font-medium mb-3">Tamanho</h4>
        <div className="grid grid-cols-4 gap-2">
          {sizes.map((size) => (
            <button
              key={size.id}
              onClick={() => toggleArrayFilter("sizes", size.id)}
              className={`p-2 text-sm border rounded transition-all ${
                filters.sizes.includes(size.id)
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-primary"
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h4 className="font-medium mb-3">Preço</h4>
        <div className="space-y-4">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilter("priceRange", value as [number, number])}
            max={1000}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>R$ {filters.priceRange[0]}</span>
            <span>R$ {filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Additional Filters */}
      <div>
        <h4 className="font-medium mb-3">Disponibilidade</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="inStock"
              checked={filters.inStock}
              onCheckedChange={(checked) => updateFilter("inStock", checked)}
            />
            <Label htmlFor="inStock" className="text-sm">
              Apenas em estoque
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isNew"
              checked={filters.isNew}
              onCheckedChange={(checked) => updateFilter("isNew", checked)}
            />
            <Label htmlFor="isNew" className="text-sm">
              Novidades
            </Label>
          </div>
        </div>
      </div>
    </div>
  )
}
