import { AdminLayout } from "@/components/admin/admin-layout"
import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard"

export const dynamic = "force-dynamic"

export default function AdminReportsPage() {
  return (
    <AdminLayout>
      <AnalyticsDashboard />
    </AdminLayout>
  )
}
