'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Award, Briefcase, Zap, Truck, FileText } from 'lucide-react'

interface Training {
  title: string
  provider: string
  courseId?: string
  association?: string
  icon: React.ReactNode
}

const trainings: Training[] = [
  {
    title: "Contract Administration Strategies",
    provider: "Procurement U",
    courseId: "203",
    icon: <FileText className="h-6 w-6" />
  },
  {
    title: "Battery Energy Storage System Procurement Considerations",
    provider: "FEMP",
    courseId: "ODW156",
    icon: <Zap className="h-6 w-6" />
  },
  {
    title: "Commodity Strategy and Category Management",
    provider: "Accenture Academy",
    association: "De Beers Marine (PTY) LTD",
    icon: <Briefcase className="h-6 w-6" />
  },
  {
    title: "Contracting for Efficiency: In-Depth Training for Contracting Officers",
    provider: "FEMP",
    courseId: "38",
    icon: <FileText className="h-6 w-6" />
  },
  {
    title: "Decarbonization Considerations: Performance Contracting",
    provider: "FEMP",
    courseId: "ODW098",
    icon: <Zap className="h-6 w-6" />
  },
  {
    title: "EV Champion Training 1: Electric Vehicle Technology and Financial Considerations",
    provider: "FEMP",
    courseId: "ODW109",
    icon: <Truck className="h-6 w-6" />
  },
  {
    title: "Elements of Effective Contract Management",
    provider: "Accenture Academy",
    association: "De Beers Marine (PTY) LTD",
    icon: <FileText className="h-6 w-6" />
  },
  {
    title: "Energy Performance Contracting: Tools for Success",
    provider: "FEMP",
    courseId: "ODW012",
    icon: <Zap className="h-6 w-6" />
  },
  {
    title: "Impact of Poor Contract Management",
    provider: "Accenture Academy",
    association: "De Beers Marine (PTY) LTD",
    icon: <FileText className="h-6 w-6" />
  },
  {
    title: "Spotlight on Analytics: Business Intelligence vs. Business Analytics (AA)",
    provider: "Accenture Academy",
    association: "De Beers Marine (PTY) LTD",
    icon: <BookOpen className="h-6 w-6" />
  },
  {
    title: "Strategic Sourcing and Category Management",
    provider: "Commerce Edge",
    icon: <Briefcase className="h-6 w-6" />
  },
  {
    title: "Supply Chain Management: Digital Transformation and Optimisation",
    provider: "MANCOSA",
    courseId: "SNCC26564",
    icon: <Truck className="h-6 w-6" />
  },
  {
    title: "The Principles and Process for Conducting a Life-Cycle Cost Analysis",
    provider: "WBDG",
    courseId: "16",
    icon: <Award className="h-6 w-6" />
  },
]

export default function TrainingPage() {
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
          Professional Training & Development
        </motion.h1>
        <motion.p 
          className="text-xl text-muted-foreground mb-8"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          Continuous learning and skill enhancement in procurement, supply chain management, and related fields.
        </motion.p>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {trainings.map((training, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="mb-6 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {training.icon}
                    {training.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold">{training.provider}</h3>
                  {training.courseId && (
                    <Badge variant="secondary" className="mt-2">Course ID: {training.courseId}</Badge>
                  )}
                  {training.association && (
                    <p className="text-sm text-muted-foreground mt-2">Associated with: {training.association}</p>
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