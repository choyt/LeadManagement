import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { getLeads, saveLead, Lead } from '@/lib/leads-store'

export async function GET() {
  const leads = await getLeads()
  return NextResponse.json(leads)
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const newLead: Lead = {
    id: uuidv4(),
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    email: formData.get('email') as string,
    linkedin: formData.get('linkedin') as string,
    visas: formData.get('visas') as string,
    resume: '/resumes/placeholder.pdf', // In a real app, you'd handle file upload here
    openInput: formData.get('openInput') as string,
    state: 'PENDING'
  }

  await saveLead(newLead)

  return NextResponse.json(newLead, { status: 201 })
}