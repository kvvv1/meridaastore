import { AdminLayout } from "@/components/admin/admin-layout"
import { CustomersManagement } from "@/components/admin/customers-management"

export default function AdminCustomersPage() {
  return (
    <AdminLayout>
      <CustomersManagement />
    </AdminLayout>
  )
}
