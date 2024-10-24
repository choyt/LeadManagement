import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import LeadsList from "@/components/LeadsList"
import { getLeads } from "@/lib/leads-store"

export default async function AdminLeadsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  const leads = await getLeads()

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Leads Management</h1>
      <LeadsList initialLeads={leads} />
    </div>
  )
}