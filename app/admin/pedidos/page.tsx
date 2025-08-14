import { OrdersManagement } from "@/components/admin/orders-management"
import { AdminLayout } from "@/components/admin/admin-layout"

export default function AdminOrdersPage() {
  return (
    <AdminLayout>
      <OrdersManagement />
    </AdminLayout>
  )
}
