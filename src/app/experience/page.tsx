'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { ChevronDown, ChevronUp, Briefcase, Building2, MapPin, Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface Experience {
  title: string
  company: string
  date: string
  location: string
  responsibilities: string[]
  skills: string[]
}

const experiences: Experience[] = [
  {
    title: "Technical Buyer",
    company: "De Beers Marine (PTY) LTD",
    date: "Jan 2022 to Present · 2 yrs 10 mos",
    location: "Cape Town, Western Cape, South Africa · On-site",
    responsibilities: [
      "Lead technical purchasing and Management of requisition-to-pay processes for goods and services.",
      "Interpret technical specs and verify Incoterms for alignment with business goals.",
      "Negotiate master contracts and select suppliers with strong reputations.",
      "Report on purchasing trends, offering insights on cost savings and efficiency.",
      "Onboard vendors on Ariba, ensuring policy compliance and build strong supplier relationships.",
      "Source and evaluate vendors to diversify and optimize the supply chain and monitor SLAs for quality.",
      "Engage stakeholders to align sourcing with business objectives.",
      "Generate reports on vendor performance and sourcing effectiveness.",
      "Conduct spend analysis and generate reports using Power BI and Excel and presentation on PowerPoint",
      "Present procurement performance and track open orders for efficiency.",
      "Report on WIP and procurement stages.",
      "Evaluate quotes and tenders, providing recommendations based on technical and commercial factors.",
      "Ensure bids align with value for money and technical specs, and report on evaluations.",
      "Ensure adherence to procurement policies and identify risks.",
      "Align procurement with company policies and legislation.",
      "Prepare compliance reports highlighting risks and adherence to policies.",
      "Monitor internal SLAs to align with procurement timelines.",
      "Confirm services rendered using SERVQUAL and RATER, ensuring satisfaction.",
      "Compile reports on service delivery and collaborate with stakeholders to meet strategic needs.",
      "Collaborate cross-functionally, bringing technical expertise to procurement.",
      "Report on collaboration outcomes, aligning procurement strategies with business goals."
    ],
    skills: [
      "Contractual Obligations", "Incoterms", "Optimization", "Category Management", "Compliance Regulations",
      "Time Management", "Critical Thinking", "Engineering Changes", "Technical Instruction", "Statutory Accounting Principles (SAP)",
      "Strategic Procurement", "Project Management", "Analytical Skills", "SAP ERP", "Business Development",
      "Commercial Negotiation", "Teamwork", "Supply Chain Optimization", "eSourcing", "Comparative Analysis",
      "Root Cause Analysis", "Conflict Management", "Benchmarking", "Stakeholder Management", "Key Performance Indicators",
      "Defining Requirements", "Commodities", "Can Do Approach", "Competitive Pricing", "Business Case Preparation",
      "Cost Savings Strategies", "Supplier Evaluation", "Communication", "Cost Effective", "Integrated Supply Chain Management",
      "Sales", "Relationship Development", "Technical Drawing", "Supply Chain Management", "Contract Management",
      "Market Analysis", "Purchasing Power", "Contractual", "Supplier Sourcing", "SAP Materials Management (SAP MM)",
      "Cost Management", "Office Software", "SAP HANA", "CIPS", "Materials Management",
      "Total Cost of Ownership", "Vendor Management", "Government Procurement", "Supply Chain Consulting", "Negotiation",
      "Attention to Detail", "Commercial Planning", "Demand Analysis", "Commercial Awareness"
    ]
  },
  {
    title: "Category Buyer",
    company: "Engen",
    date: "Jul 2018 to Dec 2021 · 3 yrs 6 mos",
    location: "Cape Town, Western Cape, South Africa · Hybrid",
    responsibilities: [
      "Execute procure-to-pay processes, implementing sourcing strategies to meet business requirements.",
      "Manage requisition-to-pay processes, supporting supplier selection, quotations, and negotiations.",
      "Analyze procurement data, generate reports using SAP and Coupa, and ensure data integrity.",
      "Create and manage contracts, ensuring compliance and fulfillment of business needs.",
      "Monitor contract compliance and take ownership of open and post facto purchase orders for timely execution.",
      "Source, evaluate, and onboard vendors, ensuring optimal terms and compliance with policies.",
      "Prepare RFI, RFQ, and RFP documents to manage non-strategic sourcing categories.",
      "Facilitate supplier relationship management and oversee performance through SLAs.",
      "Supporting international procurement for Engineering and Construction projects in Namibia, Mauritius, DRC, Botswana, Lesotho, Eswatini, and South Africa.",
      "Demonstrate expertise in sourcing oil refinery materials to achieve optimal project outcomes.",
      "Lead (Acting in the absence of my Manager) procurement teams, managing escalations and approving process deviations and contract amendments.",
      "Facilitate SLA meetings with stakeholders and suppliers, driving performance improvements.",
      "Conduct training workshops to align team capabilities with organizational goals.",
      "Spearhead process optimization initiatives to improve procurement efficiency.",
      "Play a key role in decision-making by approving purchase orders and resolving procurement issues.",
      "Support international procurement teams in approving processes on SAP and Service Now system across diverse regions."
    ],
    skills: [
      "Contractual Obligations", "Incoterms", "Optimization", "Category Management", "Compliance Regulations",
      "Time Management", "Critical Thinking", "Engineering Changes", "Technical Instruction", "Statutory Accounting Principles (SAP)",
      "Strategic Procurement", "Supervisory Skills", "Project Management", "Analytical Skills", "SAP ERP",
      "Commercial Negotiation", "Teamwork", "Supply Chain Optimization", "Comparative Analysis", "Root Cause Analysis",
      "Conflict Management", "Benchmarking", "Stakeholder Management", "Key Performance Indicators", "Defining Requirements",
      "Commodities", "Competitive Pricing", "Business Case Preparation", "Cost Savings Strategies", "Supplier Evaluation",
      "Communication", "Integrated Supply Chain Management", "Change Management", "Relationship Development", "Technical Drawing",
      "Market Analysis", "Capital Expenditures", "Purchasing Power", "Contractual", "SAP Materials Management (SAP MM)",
      "Cost Management", "Office Software", "CIPS", "Materials Management", "Total Cost of Ownership",
      "Vendor Management", "Government Procurement", "Commercial Planning", "Commercial Awareness"
    ]
  },
  {
    title: "Buyer",
    company: "Transnet Port Terminals",
    date: "Aug 2015 to Jun 2018 · 2 yrs 11 mos",
    location: "Saldanha Bay, Western Cape, South Africa · On-site",
    responsibilities: [
      "Advertise tenders as per Delegation of Authority and value thresholds, ensuring compliance with procurement regulations.",
      "Prepare RFI, RFQ, and RFP documentation to facilitate competitive bidding processes.",
      "Identify and qualify potential suppliers through market research to diversify the supplier base.",
      "Collaborate with internal stakeholders to align sourcing activities with project needs and business objectives.",
      "Manage the tender process from initiation to award, ensuring transparency, compliance, and optimal sourcing outcomes.",
      "Provide 1st Line SAP MM Super User support, including training and resolving user issues.",
      "Serve as the interface between the SAP Competency Centre and end-users, logging, testing, and ensuring system improvements.",
      "Ensure administrative procurement functions align with approved Business Critical Activities, the Commercial Framework, and the Procure-to-Pay (P2P) process.",
      "Create purchase orders on SAP, ensuring adherence to planned delivery dates.",
      "Source new products and suppliers, including BBBEE suppliers, while ensuring alignment with Transnet's procurement policies and procedures.",
      "Evaluate supplier performance through self-management and exception reporting, recommending corrective actions where needed.",
      "Monitor purchasing patterns, particularly low-value orders, and variation orders (Invoice vs Purchase Order), recommending for approval.",
      "Negotiate with suppliers on prices, terms, specifications, delivery times, and quantities, ensuring effective material delivery.",
      "Collaborate with auditors to resolve audit findings and prevent recurrence of issues.",
      "Escalate non-compliance issues to the appropriate authorities."
    ],
    skills: [
      "Supplier Management", "Strategic Thinking", "Business Analysis", "Contractual Obligations", "Incoterms",
      "costs Reduction", "Optimization", "Category Management", "Problem Solving", "Compliance Regulations",
      "Time Management", "Critical Thinking", "Engineering Changes", "Inventory Optimization", "Stock Control",
      "Statutory Accounting Principles (SAP)", "Strategic Procurement", "Supervisory Skills", "Project Management",
      "Analytical Skills", "SAP ERP", "Spend Analysis", "Public Procurement", "Commercial Negotiation", "Teamwork",
      "Supplier Rationalization", "Supply Chain Optimization", "eSourcing", "Team Leadership", "Strategic Sourcing",
      "Comparative Analysis", "Root Cause Analysis", "Purchasing Processes", "Conflict Management", "Benchmarking",
      "Supply Chain Operations", "Stakeholder Management", "Management", "SAP Ariba", "Key Performance Indicators",
      "Defining Requirements", "Commodities", "Competitive Pricing", "Inventory Analysis", "Business Case Preparation",
      "Cost Savings Strategies", "Supplier Evaluation", "Communication", "Integrated Supply Chain Management", "Sales",
      "Change Management", "Supply Management", "Relationship Development", "Leadership", "Technical Drawing",
      "Supply Chain Management", "Stakeholder Engagement", "Team Management", "Market Analysis", "Reverse Logistics",
      "Supply", "Purchasing Power", "Regulatory Compliance", "Contractual", "Supplier Development",
      "Requirements Consolidation", "Supplier Sourcing", "SAP Materials Management (SAP MM)", "Cost Management",
      "Office Software", "SAP HANA", "CIPS", "Materials Management", "Sourcing", "Total Cost of Ownership",
      "Vendor Management", "Retail Sales", "Government Procurement", "Supply Chain Consulting", "Negotiation",
      "Attention to Detail", "Commercial Planning", "Import/Export Operations", "Commercial Awareness"
    ]
  },
  {
    title: "Stock Controller",
    company: "Transnet Port Terminals",
    date: "Mar 2015 to Aug 2015 · 6 mos",
    location: "Saldanha Bay, Western Cape, South Africa · On-site",
    responsibilities: [
      "Ensure accurate issuing of stock items, verifying quantities to prevent discrepancies.",
      "Participate in bi-annual stock takes, collaborating with stores personnel for accuracy.",
      "Record stock out instances and maintain a comprehensive list of reservations versus stock issues.",
      "Verify, pack, and issue stock into correct bins, ensuring bins reflect accurate amounts for distribution.",
      "Maintain a meticulous filing system to ensure documentation availability for audit purposes.",
      "Receive and tag rotable components for repair, particularly during breakdowns.",
      "Issue stock transactions on SAP, adhering to Logistics procedures and policies.",
      "Ensure the picking list/goods issuing document is signed before releasing materials to end users.",
      "Maintain housekeeping standards in stores, ensuring proper bin allocation and cleanliness.",
      "Report missing or damaged items in bins, ensuring corrective actions are taken.",
      "Facilitate clear communication during shift handovers to ensure seamless operations.",
      "Treat customers with respect and uphold high levels of customer service in all interactions.",
      "Work collaboratively with team members, maintaining accurate stock records, and contributing to efficient logistics operations within the Bulk Iron Ore Port Terminal sector."
    ],
    skills: [
      "Optimization", "Compliance Regulations", "Time Management", "Strategic Procurement", "Analytical Skills",
      "SAP ERP", "Teamwork", "Supply Chain Optimization", "Comparative Analysis", "Root Cause Analysis",
      "Conflict Management", "Benchmarking", "Stakeholder Management", "Key Performance Indicators",
      "Defining Requirements", "Communication", "Integrated Supply Chain Management",
      "SAP Materials Management (SAP MM)", "Office Software", "CIPS", "Materials Management",
      "Vendor Management", "Commercial Planning", "Demand Analysis"
    ]
  },
  {
    title: "Buyer",
    company: "Western Cape Government",
    date: "Sep 2012 to Feb 2015 · 2 yrs 6 mos",
    location: "Cape Town, Western Cape, South Africa",
    responsibilities: [
      "Perform asset-related tasks, updating and maintaining the asset register for medical equipment purchases, donations, transfers, and disposals.",
      "Ensure compliance with healthcare asset management protocols for medical devices and critical surgical equipment.",
      "Execute duties related to the procurement of surgical and non-surgical medical items, ensuring adherence to healthcare procurement guidelines.",
      "Handle Buyer, Demand, and Acquisition Management tasks for medical consumables, ensuring a steady supply of critical healthcare items.",
      "Collaborate with clinical staff to understand and meet their requirements for medical supplies and equipment.",
      "Provide support to the Supply Chain Manager, assisting with procurement and distribution of medical supplies.",
      "Rotate duties across various areas of supply chain management, handling queries, and ensuring timely delivery of critical medical items.",
      "Assist in relieving functions related to stock management, focusing on high-priority medical equipment and consumables.",
      "Maintain item records on LOGIS for all surgical and non-surgical medical stock, ensuring accuracy and traceability.",
      "Manage procurement files and follow up with suppliers on outstanding orders of medical equipment and consumables.",
      "Perform filing and record-keeping activities to comply with healthcare financial prescripts and auditing standards."
    ],
    skills: [
      "Customer Relationship Management (CRM)", "Supplier Management", "Strategic Thinking", "Business Analysis",
      "Incoterms", "costs Reduction", "Optimization", "Category Management", "Problem Solving",
      "Compliance Regulations", "Time Management", "Critical Thinking", "Engineering Changes",
      "Inventory Optimization", "Customer Service", "Stock Control", "Strategic Procurement",
      "Supervisory Skills", "Project Management", "Analytical Skills", "SAP ERP", "Business Development",
      "Spend Analysis", "Public Procurement", "Teamwork", "Supplier Rationalization",
      "Supply Chain Optimization", "eSourcing", "Team Leadership", "Strategic Sourcing", "Cost Reporting",
      "Root Cause Analysis", "Purchasing Processes", "Conflict Management", "Benchmarking",
      "Supply Chain Operations", "Stakeholder Management", "Management", "SAP Ariba",
      "Key Performance Indicators", "Contract Negotiation", "Defining Requirements", "Commodities",
      "Inventory Analysis", "Business Case Preparation", "Cost Savings Strategies", "Supplier Evaluation",
      "Communication", "Integrated Supply Chain Management", "Sales", "Change Management", "Data Analysis",
      "Demand Planning", "Supply Management", "Relationship Development", "Leadership", "Technical Drawing",
      "Supply Chain Management", "Stakeholder Engagement", "Team Management", "Contract Management",
      "Market Analysis", "Reverse Logistics", "Supply", "Regulatory Compliance", "Supplier Development",
      "Requirements Consolidation", "Supplier Sourcing", "SAP Materials Management (SAP MM)",
      "Cost Management", "Office Software", "SAP HANA", "CIPS", "Materials Management", "Sourcing",
      "Total Cost of Ownership", "Vendor Management", "Retail Sales", "Government Procurement",
      "Supply Chain Consulting", "Negotiation", "Commercial Planning", "Import/Export Operations",
      "Commercial Awareness"
    ]
  },
  {
    title: "Sales Consultant",
    company: "Capitec Bank",
    date: "Sep 2007 to Aug  2012 · 5 yrs",
    location: "Cape Town,   Western Cape, South Africa · On-site",
    responsibilities: [
      "Provide exceptional client service by fulfilling and exceeding expressed needs in areas such as Save, Transact, Credit, and Insure.",
      "Consult with clients to understand their financial requirements, ensuring satisfaction with Capitec's services.",
      "Accurately and promptly gather and capture client information for loan approvals, ensuring compliance with regulations.",
      "Conduct deposit and enquiry transactions efficiently, meeting client expectations in a timely manner.",
      "Maintain up-to-date knowledge and competency to effectively sell Global One products in the client's best interest.",
      "Continuously update knowledge of Capitec's banking products and services to provide well-informed recommendations tailored to client needs.",
      "Deliver a high-quality front-line banking service within the branch, ensuring a seamless client experience.",
      "Conduct thorough consultations with clients, ensuring a clear understanding of their financial needs and providing suitable banking solutions.",
      "Gather and capture information efficiently, ensuring data accuracy and quick resolution of client requests.",
      "Collaborate effectively with clients, ensuring their financial needs are met while contributing to the overall success of Capitec Bank."
    ],
    skills: [
      "Compliance Regulations", "Time Management", "Analytical Skills", "Conflict Management",
      "Stakeholder Management", "Communication", "Office Software"
    ]
  },
  {
    title: "Specialist Retail Associate",
    company: "Edgars",
    date: "Mar 2004 to Sep 2007 · 3 yrs 7 mos",
    location: "Cape Town, Western Cape, South Africa · On-site",
    responsibilities: [
      "Provide exceptional customer service by understanding and exceeding customers' expressed needs.",
      "Utilize product knowledge to guide customers in making informed purchasing decisions, ensuring a positive shopping experience.",
      "Accurately and efficiently handle sales transactions, inquiries, and customer requests.",
      "Ensure timely and precise capture of customer information for order processing and inquiries.",
      "Stay updated on the latest products and promotions to provide informed recommendations to customers.",
      "Maintain expertise in selling various product categories offered by Edgars to meet customer needs.",
      "Deliver quality front-line retail service by engaging with customers in a friendly, approachable manner.",
      "Conduct consultations with customers to understand their preferences and assist them in selecting the right products.",
      "Collaborate with team members to maintain a tidy and organized store environment.",
      "Contribute to inventory management and stock replenishment activities to ensure product availability.",
      "Work collaboratively with team members, ensuring a positive shopping experience for customers and contributing to the success of Edgars Retail Store."
    ],
    skills: [
      "Compliance Regulations", "Time Management", "Customer Service", "Analytical Skills",
      "Conflict Management", "Stakeholder Management", "Communication", "Office Software",
      "Retail Sales", "Commercial Awareness"
    ]
  }
]

export default function Experience() {
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null)

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

  const toggleExperience = (index: number) => {
    setExpandedExperience(prevState => prevState === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="relative w-full aspect-[21/9] md:aspect-[21/7] lg:aspect-[21/6]">
        <Image
          src="/experience-banner.jpg"
          alt="Experience Banner"
          fill
          quality={100}
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4">
            Professional Experience
          </h1>
        </div>
      </div>

      <motion.div 
        ref={containerRef}
        className="py-16 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto">
          <motion.p 
            className="text-xl text-muted-foreground mb-8 text-center"
            variants={itemVariants}
          >
            A journey through my professional growth and achievements
          </motion.p>
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="mb-6 transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl font-semibold">{exp.title}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Building2 className="mr-1 h-4 w-4" />
                        {exp.company}
                      </CardDescription>
                      <p className="text-sm text-muted-foreground mt-1 flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        {exp.date}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1 flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        {exp.location}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExperience(index)}
                      aria-label={expandedExperience === index ? "Collapse details" : "Expand details"}
                    >
                      {expandedExperience === index ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                {expandedExperience === index && (
                  <CardContent>
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Briefcase className="mr-2 h-4 w-4" />
                      Key Responsibilities
                    </h3>
                    <ul className="list-disc pl-5 mb-4 space-y-1">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="text-sm">{resp}</li>
                      ))}
                    </ul>
                    <h3 className="font-semibold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, i) => (
                        <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}