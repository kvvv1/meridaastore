import { OrdersManagement } from "@/components/admin/orders-management"
import { AdminLayout } from "@/components/admin/admin-layout"

export const dynamic = "force-dynamic"

export default function AdminOrdersPage() {
  return (
    <AdminLayout>
      <OrdersManagement />
    </AdminLayout>
  )
}
