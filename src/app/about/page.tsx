'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Briefcase, TrendingUp, Leaf, DollarSign, Brain, Rocket, Wrench } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from 'next/image'

export default function About() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

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

  const skills = [
    "SAP", "Coupa", "IPS", "Ariba", "Syspro", "Logis", "BAS", "Power BI", 
    "Ms Excel", "Flourish", "Tableau", "Power Pivot", "Visio", "Celonis", "CIPS Member"
  ]

  return (
    <motion.div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-background to-background/80 py-16 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-primary mb-8"
          variants={itemVariants}
        >
          About Fuzile Zono
        </motion.h1>

        <motion.section className="mb-12 flex flex-col md:flex-row items-start gap-8" variants={itemVariants}>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Briefcase className="mr-2 text-primary" />
              Experience & Expertise
            </h2>
            <p className="text-lg mb-4">
              With more than <strong>11 years of experience</strong> in procurement and supply, I focus on sourcing goods and services, supporting <strong>refurbishment, repair and assembly</strong> of key systems like <strong>Stacker Reclaimers, Tipplers, Conveyor Systems, Plant Control and Instrumentation, Marine Mining Systems, Medical Equipment and Oil Refinery Maintenance Materials</strong>.
            </p>
            <p className="text-lg mb-4">
              I have a strong background in <strong>Engineering and Construction procurement</strong>, always aiming for efficient, <strong>compliant, safe, and sustainable</strong> outcomes that meet business needs.
            </p>
          </div>
          <div className="md:w-1/2">
            <motion.div
              className="rounded-lg overflow-hidden shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/fuzile.jpeg"
                alt="Fuzile Zono"
                width={400}
                height={400}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </motion.section>

        <motion.section className="mb-12" variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Wrench className="mr-2 text-primary" />
            Skills & Strategies
          </h2>
          <ul className="list-none text-lg mb-4 space-y-4">
            {[
              { icon: TrendingUp, text: "Developing innovative procurement strategies to streamline processes and improve efficiency" },
              { icon: Briefcase, text: "Creating clear Procure-to-Pay process walk-throughs and useful tutorials" },
              { icon: DollarSign, text: "Managing SAP Outline Agreements" },
              { icon: Brain, text: "Technical expertise in testing, reporting, and using Power BI and Excel for data-driven insights" },
              { icon: Leaf, text: "Compiling presentations and category reports" },
              { icon: Rocket, text: "Implementing sourcing strategies for cost-effective procurement solutions" }
            ].map((item, index) => (
              <motion.li 
                key={index}
                className="flex items-start p-2 rounded-lg transition-colors duration-300 hover:bg-primary/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="mr-2 text-primary flex-shrink-0 mt-1" />
                <span>{item.text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.section>

        <motion.section className="mb-12" variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <DollarSign className="mr-2 text-primary" />
            Financial Insights & Problem-Solving
          </h2>
          <p className="text-lg mb-4">
            My financial insights help businesses in <strong>managing their procurement spend, reducing costs while maximizing value</strong>. I&apos;m known for my <strong>strong problem-solving skills</strong> and ability to listen, dedicated to resolving procurement issues quickly and effectively.
          </p>
        </motion.section>

        <motion.section className="mb-12" variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Rocket className="mr-2 text-primary" />
            Passion & Goals
          </h2>
          <p className="text-lg mb-4">
            I&apos;m passionate about improving procurement processes and look forward to partnering with organizations that require a <strong>results-driven Procurement Specialist</strong> to boost their operations and achieve <strong>sustainable growth</strong>.
          </p>
        </motion.section>

        <motion.section className="mb-12" variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Wrench className="mr-2 text-primary" />
            Technical Skills
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="bg-secondary/10 p-3 rounded-lg text-center"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--primary), 0.15)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-sm font-medium">{skill}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/contact" className="flex items-center justify-center">
              Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}