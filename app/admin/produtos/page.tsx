import { ProductsManagement } from "@/components/admin/products-management"
import { AdminLayout } from "@/components/admin/admin-layout"

export const dynamic = "force-dynamic"

export default function AdminProductsPage() {
  return (
    <AdminLayout>
      <ProductsManagement />
    </AdminLayout>
  )
}
