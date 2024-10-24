import fs from 'fs/promises'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'leads.json')

export type Lead = {
  id: string
  firstName: string
  lastName: string
  email: string
  linkedin: string
  visas: string
  resume: string
  openInput: string
  state: 'PENDING' | 'REACHED_OUT'
}

export async function getLeads(): Promise<Lead[]> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading leads data:', error)
    return []
  }
}

export async function saveLead(lead: Lead): Promise<void> {
  const leads = await getLeads()
  const index = leads.findIndex(l => l.id === lead.id)
  if (index !== -1) {
    leads[index] = lead
  } else {
    leads.push(lead)
  }
  await fs.writeFile(DATA_FILE, JSON.stringify(leads, null, 2))
}

export async function updateLeadState(id: string, state: 'PENDING' | 'REACHED_OUT'): Promise<Lead | null> {
  const leads = await getLeads()
  const lead = leads.find(l => l.id === id)
  if (lead) {
    lead.state = state
    await saveLead(lead)
    return lead
  }
  return null
}
