import { ProductsManagement } from "@/components/admin/products-management"
import { AdminLayout } from "@/components/admin/admin-layout"

export default function AdminProductsPage() {
  return (
    <AdminLayout>
      <ProductsManagement />
    </AdminLayout>
  )
}
