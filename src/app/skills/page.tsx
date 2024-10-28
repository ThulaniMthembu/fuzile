'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Skill {
  name: string
  experiences: string
  endorsements?: number
}

const skills: Skill[] = [
  { name: "Commercial Planning", experiences: "5 experiences across De Beers Marine (PTY) LTD and 3 other companies" },
  { name: "Teamwork", experiences: "5 experiences across De Beers Marine (PTY) LTD and 3 other companies", endorsements: 7 },
  { name: "Commercial Negotiation", experiences: "3 experiences across De Beers Marine (PTY) LTD and 2 other companies" },
  { name: "Technical Instruction", experiences: "2 experiences across De Beers Marine (PTY) LTD and 1 other company" },
  { name: "Statutory Accounting Principles (SAP)", experiences: "3 experiences across De Beers Marine (PTY) LTD and 2 other companies" },
  { name: "Contractual Obligations", experiences: "3 experiences across De Beers Marine (PTY) LTD and 2 other companies" },
  { name: "Competitive Pricing", experiences: "3 experiences across De Beers Marine (PTY) LTD and 2 other companies" },
  { name: "Comparative Analysis", experiences: "4 experiences across De Beers Marine (PTY) LTD and 2 other companies" },
  { name: "Contractual", experiences: "3 experiences across De Beers Marine (PTY) LTD and 2 other companies" },
  { name: "Office Software", experiences: "7 experiences across De Beers Marine (PTY) LTD and 5 other companies" },
  { name: "Can Do Approach", experiences: "Technical Buyer at De Beers Marine (PTY) LTD" },
  { name: "E-procurement", experiences: "Technical Buyer at De Beers Marine (PTY) LTD", endorsements: 3 },
  { name: "Purchasing Power", experiences: "3 experiences across De Beers Marine (PTY) LTD and 2 other companies", endorsements: 1 },
  { name: "Demand Analysis", experiences: "2 experiences across De Beers Marine (PTY) LTD and 1 other company", endorsements: 1 },
  { name: "Cost Effective", experiences: "Technical Buyer at De Beers Marine (PTY) LTD" },
  { name: "Capex", experiences: "Not specified" },
  { name: "Capital Expenditures", experiences: "Category Buyer at Engen" },
  { name: "Business Analysis", experiences: "2 experiences across Transnet Port Terminals and 1 other company", endorsements: 7 },
  { name: "Demand Planning", experiences: "Buyer at Western Cape Government" },
  { name: "Data Analysis", experiences: "Buyer at Western Cape Government", endorsements: 3 },
  { name: "Customer Relationship Management (CRM)", experiences: "Buyer at Western Cape Government" },
  { name: "Stakeholder Engagement", experiences: "2 experiences across Transnet Port Terminals and 1 other company" },
  { name: "Supplier Rationalization", experiences: "2 experiences across Transnet Port Terminals and 1 other company" },
  { name: "Requirements Consolidation", experiences: "2 experiences across Transnet Port Terminals and 1 other company" },
  { name: "costs Reduction", experiences: "2 experiences across Transnet Port Terminals and 1 other company" },
  { name: "Cost Reporting", experiences: "Buyer at Western Cape Government" },
  { name: "Reverse Logistics", experiences: "2 experiences across Transnet Port Terminals and 1 other company" },
  { name: "Team Management", experiences: "2 experiences across Transnet Port Terminals and 1 other company" },
  { name: "Supplier Development", experiences: "2 experiences across Transnet Port Terminals and 1 other company" },
  { name: "Import/Export Operations", experiences: "2 experiences across Transnet Port Terminals and 1 other company" },
  { name: "SAP Ariba", experiences: "2 experiences across Transnet Port Terminals and 1 other company" },
  { name: "Regulatory Compliance", experiences: "2 experiences across Transnet Port Terminals and 1 other company" },
  { name: "Leadership", experiences: "2 experiences across Transnet Port Terminals and 1 other company", endorsements: 6 },
  { name: "Supply Chain Operations", experiences: "2 experiences across Transnet Port Terminals and 1 other company" },
  { name: "Auditing", experiences: "Not specified" },
  { name: "Supervisory Skills", experiences: "3 experiences across Engen and 2 other companies" },
  { name: "Sales", experiences: "3 experiences across De Beers Marine (PTY) LTD and 2 other companies", endorsements: 10 },
  { name: "Contract Management", experiences: "2 experiences across De Beers Marine (PTY) LTD and 1 other company" },
  { name: "Strategic Thinking", experiences: "2 experiences across Transnet Port Terminals and 1 other company" },
  { name: "Problem Solving", experiences: "2 experiences across Transnet Port Terminals and 1 other company" },
  { name: "Supply Management", experiences: "2 experiences across Transnet Port Terminals and 1 other company" },
  { name: "eSourcing", experiences: "3 experiences across De Beers Marine (PTY) LTD and 2 other companies" },
  { name: "Supplier Sourcing", experiences: "3 experiences across De Beers Marine (PTY) LTD and 2 other companies" },
  { name: "Supply Chain Management", experiences: "3 experiences across De Beers Marine (PTY) LTD and 2 other companies", endorsements: 19 },
  { name: "Purchasing Processes", experiences: "2 experiences across Transnet Port Terminals and 1 other company" },
  { name: "Supply Chain Consulting", experiences: "3 experiences across De Beers Marine (PTY) LTD and 2 other companies" },
  { name: "SAP HANA", experiences: "3 experiences across De Beers Marine (PTY) LTD and 2 other companies" },
  { name: "Negotiation", experiences: "3 experiences across De Beers Marine (PTY) LTD and 2 other companies" },
  { name: "Business Development", experiences: "2 experiences across De Beers Marine (PTY) LTD and 1 other company" },
  { name: "Attention to Detail", experiences: "2 experiences across De Beers Marine (PTY) LTD and 1 other company" },
  { name: "Stakeholder Management", experiences: "7 experiences across De Beers Marine (PTY) LTD and 5 other companies" },
  { name: "Critical Thinking", experiences: "4 experiences across De Beers Marine (PTY) LTD and 3 other companies" },
  { name: "Relationship Development", experiences: "4 experiences across De Beers Marine (PTY) LTD and 3 other companies" },
  { name: "Market Analysis", experiences: "4 experiences across De Beers Marine (PTY) LTD and 3 other companies" },
  { name: "Commercial Awareness", experiences: "5 experiences across De Beers Marine (PTY) LTD and 4 other companies" },
  { name: "Time Management", experiences: "7 experiences across De Beers Marine (PTY) LTD and 5 other companies" },
  { name: "Communication", experiences: "7 experiences across De Beers Marine (PTY) LTD and 5 other companies" },
  { name: "Analytical Skills", experiences: "7 experiences across De Beers Marine (PTY) LTD and 5 other companies" },
  { name: "Materials Management", experiences: "5 experiences across De Beers Marine (PTY) LTD and 3 other companies" },
  { name: "Root Cause Analysis", experiences: "5 experiences across De Beers Marine (PTY) LTD and 3 other companies" },
  { name: "Engineering Changes", experiences: "4 experiences across De Beers Marine (PTY) LTD and 3 other companies" },
  { name: "Technical Drawing", experiences: "4 experiences across De Beers Marine (PTY) LTD and 3 other companies" },
  { name: "Defining Requirements", experiences: "5 experiences across De Beers Marine (PTY) LTD and 3 other companies" },
  { name: "CIPS", experiences: "5 experiences across De Beers Marine (PTY) LTD and 3 other companies" },
  { name: "Key Performance Indicators", experiences: "5 experiences across De Beers Marine (PTY) LTD and 3 other companies" },
  { name: "Supplier Evaluation", experiences: "4 experiences across De Beers Marine (PTY) LTD and 3 other companies" },
  { name: "Project Management", experiences: "4 experiences across De Beers Marine (PTY) LTD and 3 other companies" },
  { name: "SAP ERP", experiences: "5 experiences across De Beers Marine (PTY) LTD and 3 other companies" },
  { name: "Commodities", experiences: "4 experiences across De Beers Marine (PTY) LTD and 3 other companies" },
  { name: "Vendor Management", experiences: "5 experiences across De Beers Marine (PTY) LTD and 3 other companies" },
  { name: "Optimization", experiences: "5 experiences across De Beers Marine (PTY) LTD and 3 other companies" },
  { name: "Compliance Regulations", experiences: "7 experiences across De Beers Marine (PTY) LTD and 5 other companies" },
  { name: "Benchmarking", experiences: "5 experiences across De Beers Marine (PTY) LTD and 3 other companies" },
  { name: "Conflict Management", experiences: "7 experiences across De Beers Marine (PTY) LTD and 5 other companies" },
  { name: "Integrated Supply Chain Management", experiences: "5 experiences across De Beers Marine (PTY) LTD and 3 other companies" },
  { name: "Supply Chain Optimization", experiences: "5 experiences across De Beers Marine (PTY) LTD and 3 other companies" },
  { name: "SAP Materials Management (SAP MM)", experiences: "5 experiences across De Beers Marine (PTY) LTD and 3 other companies" },
  { name: "Government Procurement", experiences: "4 experiences across De Beers Marine (PTY) LTD and 3 other companies" },
  { name: "Cost Savings Strategies", experiences: "4 experiences across De Beers Marine (PTY) LTD and 3 other companies" },
  { name: "Business Case Preparation", experiences: "4 experiences across De Beers Marine (PTY) LTD and 3 other companies" },
  { name: "Strategic Procurement", experiences: "5 experiences across De Beers Marine (PTY) LTD and 3 other companies" },
  { name: "Category Management", experiences: "4 experiences across De Beers Marine (PTY) LTD and 3 other companies" },
  { name: "Incoterms", experiences: "4 experiences across De Beers Marine (PTY) LTD and 3 other companies" },
  { name: "Cost Management", experiences: "4 experiences across De Beers Marine (PTY) LTD and 3 other companies" },
  { name: "Total Cost of Ownership", experiences: "4 experiences across De Beers Marine (PTY) LTD and 3 other companies" },
  { name: "Customer Service", experiences: "2 experiences across Western Cape Government and 1 other company", endorsements: 23 },
  { name: "Supply", experiences: "2 experiences across Transnet Port Terminals and 1 other company" },
  { name: "Strategic Sourcing", experiences: "2 experiences across Transnet Port Terminals and 1 other company", endorsements: 2 },
  { name: "Supplier Management", experiences: "2 experiences across Transnet Port Terminals and 1 other company", endorsements: 1 },
  { name: "Change Management", experiences: "3 experiences across Engen and 2 other companies" },
  { name: "Team Leadership", experiences: "2 experiences across Transnet Port Terminals and 1 other company", endorsements: 14 },
  { name: "Management", experiences: "2 experiences across Transnet Port Terminals and 1 other company", endorsements: 26 },
  { name: "Spend Analysis", experiences: "2 experiences across Transnet Port Terminals and 1 other company", endorsements: 1 },
  { name: "Sourcing", experiences: "2 experiences across Transnet Port Terminals and 1 other company", endorsements: 7 },
  { name: "Contract Negotiation", experiences: "Buyer at Western Cape Government", endorsements: 1 },
  { name: "Inventory Optimization", experiences: "2 experiences across Transnet Port Terminals and 1 other company" },
  { name: "Inventory Analysis", experiences: "2 experiences across Transnet Port Terminals and 1 other company" },
  { name: "Stock Control", experiences: "2 experiences across Transnet Port Terminals and 1 other company" },
  { name: "Public Procurement", experiences: "2 experiences across Transnet Port Terminals and 1 other company", endorsements: 4 },
  { name: "Retail Sales", experiences: "3 experiences across Transnet Port Terminals and 2 other companies" },
]

export default function SkillsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'endorsements'>('name')

  const filteredSkills = skills.filter(skill =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedSkills = [...filteredSkills].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name)
    } else {
      return (b.endorsements || 0) - (a.endorsements || 0)
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-4">Skills & Expertise</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Explore my diverse range of skills and expertise acquired through years of experience in procurement and supply chain management. These competencies showcase my ability to drive efficiency, manage complex projects, and deliver value across various industries.
        </p>
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <Input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
          <div className="flex gap-2">
            <Button
              variant={sortBy === 'name' ? 'default' : 'outline'}
              onClick={() => setSortBy('name')}
            >
              Sort by Name
            </Button>
            <Button
              variant={sortBy === 'endorsements' ? 'default' : 'outline'}
              onClick={() => setSortBy('endorsements')}
            >
              Sort by Endorsements
            </Button>
          </div>
        </div>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {sortedSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="h-full">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{skill.experiences}</p>
                  {skill.endorsements && (
                    <Badge variant="secondary" className="mt-2">
                      {skill.endorsements} endorsement{skill.endorsements !== 1 ? 's' : ''}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}