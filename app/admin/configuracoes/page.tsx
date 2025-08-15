import { AdminLayout } from "@/components/admin/admin-layout"
import { AdminSettings } from "@/components/admin/admin-settings"

export const dynamic = "force-dynamic"

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <AdminSettings />
    </AdminLayout>
  )
}
