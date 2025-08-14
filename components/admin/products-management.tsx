"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: "Vestido Midi Elegante",
    sku: "VES001",
    category: "Vestidos",
    price: 299.9,
    stock: 15,
    status: "active",
    image: "/elegant-midi-dress-woman.png",
  },
  {
    id: 2,
    name: "Blusa Seda Premium",
    sku: "BLU002",
    category: "Blusas",
    price: 189.9,
    stock: 8,
    status: "active",
    image: "/woman-silk-blouse.png",
  },
  {
    id: 3,
    name: "Calça Wide Leg",
    sku: "CAL003",
    category: "Calças",
    price: 249.9,
    stock: 12,
    status: "active",
    image: "/wide-leg-pants-fashion.png",
  },
  {
    id: 4,
    name: "Saia Plissada",
    sku: "SAI004",
    category: "Saias",
    price: 159.9,
    stock: 0,
    status: "out_of_stock",
    image: "/pleated-skirt-fashion.png",
  },
  {
    id: 5,
    name: "Blazer Estruturado",
    sku: "BLA005",
    category: "Blazers",
    price: 399.9,
    stock: 6,
    status: "active",
    image: "/elegant-structured-blazer.png",
  },
]

export function ProductsManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusBadge = (status: string, stock: number) => {
    if (status === "out_of_stock" || stock === 0) {
      return <Badge variant="destructive">Esgotado</Badge>
    }
    if (stock <= 5) {
      return <Badge variant="secondary">Estoque Baixo</Badge>
    }
    return <Badge variant="outline">Ativo</Badge>
  }

  const formatPrice = (price: number) => `R$ ${price.toFixed(2).replace(".", ",")}`

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-heading text-3xl">Produtos</h1>
          <p className="text-muted-foreground">Gerencie seu catálogo de produtos</p>
        </div>
        <Button asChild>
          <Link href="/admin/produtos/novo">
            <Plus className="h-4 w-4 mr-2" />
            Novo Produto
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar por nome ou SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
                className={selectedCategory !== "all" ? "bg-transparent" : ""}
              >
                Todos
              </Button>
              <Button
                variant={selectedCategory === "Vestidos" ? "default" : "outline"}
                onClick={() => setSelectedCategory("Vestidos")}
                className={selectedCategory !== "Vestidos" ? "bg-transparent" : ""}
              >
                Vestidos
              </Button>
              <Button
                variant={selectedCategory === "Blusas" ? "default" : "outline"}
                onClick={() => setSelectedCategory("Blusas")}
                className={selectedCategory !== "Blusas" ? "bg-transparent" : ""}
              >
                Blusas
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Produtos ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Estoque</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary/20">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{formatPrice(product.price)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{getStatusBadge(product.status, product.stock)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/produto/${product.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Visualizar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/produtos/${product.id}/editar`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
