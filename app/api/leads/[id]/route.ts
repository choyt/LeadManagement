import { NextResponse } from 'next/server'
import { updateLeadState, getLeads } from '@/lib/leads-store'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const { state } = await request.json()

  const updatedLead = await updateLeadState(id, state)

  if (!updatedLead) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
  }

  return NextResponse.json(updatedLead)
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const leads = await getLeads()
  const lead = leads.find(lead => lead.id === id)

  if (!lead) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
  }

  return NextResponse.json(lead)
}