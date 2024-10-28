'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Award, BookOpen, Building, School, Briefcase } from 'lucide-react'

interface Education {
  institution: string
  degree: string
  period: string
  description: string
  icon: React.ReactNode
}

interface Certification {
  provider: string
  name: string
  date: string
  credentialId: string
  icon: React.ReactNode
}

const educations: Education[] = [
  {
    institution: "MANCOSA",
    degree: "Bachelor of Commerce - BCom Honours in Supply Chain Management",
    period: "Jan 2023 - Dec 2023",
    description: "Advanced knowledge in complex supply chain environments, focusing on strategic supply chain practices, procurement strategies, operations optimization, risk management, logistics, and research methodologies.",
    icon: <GraduationCap className="h-6 w-6" />
  },
  {
    institution: "CIPS - The Chartered Institute of Procurement & Supply",
    degree: "Level 5 Advanced Diploma in Procurement and Supply",
    period: "2019 - 2020",
    description: "Expertise in team management, supply chain risk management, contract assessment, ethical procurement, and category management strategies.",
    icon: <Award className="h-6 w-6" />
  },
  {
    institution: "CIPS - The Chartered Institute of Procurement & Supply",
    degree: "Level 4 Diploma, Procurement and Supply",
    period: "2017 - 2017",
    description: "Skills in procurement strategies, market management, contract formation, and ethical sourcing practices.",
    icon: <Award className="h-6 w-6" />
  },
  {
    institution: "MANCOSA",
    degree: "Advanced Diploma in Business Management (NQF Level 7)",
    period: "Jan 2021 - Dec 2021",
    description: "Comprehensive expertise in management, leadership, problem-solving, financial accounting, and business ethics.",
    icon: <BookOpen className="h-6 w-6" />
  },
  {
    institution: "University of South Africa/Universiteit van Suid-Afrika",
    degree: "NQF6 Certificate-Programme in Public Procurement",
    period: "2014 - 2014",
    description: "Focus on public finance management, procurement reporting, and legal aspects of public procurement.",
    icon: <Building className="h-6 w-6" />
  },
  {
    institution: "Intec College",
    degree: "Certificate in Storekeeping and Stock Control",
    period: "2006 - 2006",
    description: "Skills in warehouse management, inventory control, and stock valuation methods.",
    icon: <Briefcase className="h-6 w-6" />
  },
  {
    institution: "Sobantu S.S. School",
    degree: "Matric",
    period: "1999 - 1999",
    description: "Completed secondary education.",
    icon: <School className="h-6 w-6" />
  }
]

const certifications: Certification[] = [
  {
    provider: "Alison",
    name: "Introduction to Line Management",
    date: "Issued Nov 2023",
    credentialId: "5020-32205405",
    icon: <Award className="h-6 w-6" />
  },
  {
    provider: "Alison",
    name: "Organizational Change - Managing and Supporting Employees",
    date: "Issued Nov 2023",
    credentialId: "1628-32205405",
    icon: <Award className="h-6 w-6" />
  },
  {
    provider: "Coupa Software",
    name: "Coupa Analytics",
    date: "Issued Apr 2021",
    credentialId: "#C14951",
    icon: <Award className="h-6 w-6" />
  }
]

export default function EducationPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.h1 
          className="text-4xl font-bold text-primary mb-4"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          Education and Certifications
        </motion.h1>
        <motion.p 
          className="text-xl text-muted-foreground mb-8"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          My academic journey and professional certifications in supply chain management, procurement, and business administration.
        </motion.p>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-2xl font-bold text-primary mt-12 mb-6"
            variants={itemVariants}
          >
            Education
          </motion.h2>
          {educations.map((edu, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="mb-6 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {edu.icon}
                    {edu.institution}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold">{edu.degree}</h3>
                  <p className="text-sm text-muted-foreground">{edu.period}</p>
                  <p className="mt-2">{edu.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          <motion.h2 
            className="text-2xl font-bold text-primary mt-12 mb-6"
            variants={itemVariants}
          >
            Licenses & Certifications
          </motion.h2>
          {certifications.map((cert, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="mb-6 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {cert.icon}
                    {cert.provider}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground">{cert.date}</p>
                  <Badge variant="secondary" className="mt-2">Credential ID: {cert.credentialId}</Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}