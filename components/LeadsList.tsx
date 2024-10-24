'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

type Lead = {
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

export default function LeadsList({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const { toast } = useToast()

  useEffect(() => {
    const fetchLeads = async () => {
      const response = await fetch('/api/leads')
      if (response.ok) {
        const fetchedLeads = await response.json()
        setLeads(fetchedLeads)
      }
    }
    fetchLeads()
  }, [])

  const handleStateChange = async (id: string) => {
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state: 'REACHED_OUT' }),
      })

      if (!response.ok) {
        throw new Error('Failed to update lead state')
      }

      const updatedLead = await response.json()

      setLeads(prevLeads => prevLeads.map(lead => 
        lead.id === id ? updatedLead : lead
      ))

      toast({
        title: "Lead state updated",
        description: "The lead has been marked as reached out.",
      })
    } catch (error) {
      console.error('Error updating lead state:', error)
      toast({
        title: "Error",
        description: "There was a problem updating the lead state. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>LinkedIn</TableHead>
          <TableHead>Visas</TableHead>
          <TableHead>Resume</TableHead>
          <TableHead>Additional Info</TableHead>
          <TableHead>State</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead) => (
          <TableRow key={lead.id}>
            <TableCell>{`${lead.firstName} ${lead.lastName}`}</TableCell>
            <TableCell>{lead.email}</TableCell>
            <TableCell>
              <a href={lead.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Profile
              </a>
            </TableCell>
            <TableCell>{lead.visas}</TableCell>
            <TableCell>
              <a href={lead.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Download
              </a>
            </TableCell>
            <TableCell>{lead.openInput}</TableCell>
            <TableCell>
              <Badge variant={lead.state === 'PENDING' ? 'default' : 'secondary'}>
                {lead.state}
              </Badge>
            </TableCell>
            <TableCell>
              {lead.state === 'PENDING' && (
                <Button onClick={() => handleStateChange(lead.id)} size="sm">
                  Mark Reached Out
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}