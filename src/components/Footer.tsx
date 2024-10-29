import React from 'react'
import { Mail, MapPin } from 'lucide-react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import Link from 'next/link'

const faqItems = [
  {
    question: "What services do you offer?",
    answer: "I specialize in innovative procurement strategies, supply chain optimization, and strategic sourcing solutions. My services include procurement process improvement, supplier relationship management, and implementation of cutting-edge procurement technologies."
  },
  {
    question: "How can I schedule a consultation?",
    answer: "You can schedule a consultation by filling out the contact form on this page or by sending an email directly to egiefuz@gmail.com. I'll get back to you within 24-48 hours to arrange a suitable time for our discussion."
  },
  {
    question: "Do you work with international clients?",
    answer: "Yes, I work with clients globally. My expertise in procurement and supply chain management is applicable across various industries and geographical locations. I'm comfortable with remote collaboration and can adapt to different time zones."
  },
  {
    question: "What industries do you specialize in?",
    answer: "While my procurement strategies are adaptable to various sectors, I have extensive experience in manufacturing, technology, healthcare, and retail industries. However, I'm always excited to take on new challenges in different sectors."
  }
];

export default function Footer() {
  return (
    <footer className="bg-[#14213d] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-[#fca311] font-semibold text-2xl mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-[#fca311]" />
                <a href="mailto:Fuzile.Zono@Outlook.com" className="hover:text-[#fca311] transition-colors">
                Fuzile.Zono@Outlook.com
                </a>
              </li>
              <li className="flex items-center">
                <MapPin size={18} className="mr-2 text-[#fca311]" />
                <span>Cape Town, South Africa</span>
              </li>
            </ul>
            <div className="flex mt-4 space-x-4">
              <a 
                href="https://www.linkedin.com/in/fuzile-zono-197a6a72/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-[#fca311] transition-colors"
                aria-label="LinkedIn Profile"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <p>Let&apos;s connect on LinkedIn</p>
            </div>
          </div>
          <div>
            <h3 className="text-[#fca311] font-semibold text-2xl mb-4">Expertise</h3>
            <ul className="space-y-2">
              <li>Strategic Sourcing</li>
              <li>Vendor Management</li>
              <li>Cost Optimization</li>
              <li>Supply Chain Innovation</li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#fca311] font-semibold text-2xl mb-4">Industries</h3>
            <ul className="space-y-2">
              <li>Oil & Gas</li>
              <li>Mining</li>
              <li>Port Operations</li>
              <li>Public Sector</li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#fca311] font-semibold text-xl mb-4">FAQs</h3>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger className="text-white hover:text-[#fca311]">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Fuzile Zono. All rights reserved.</p>
        </div>
        <div className="mt-4 text-center text-xs text-gray-500">
          <Link href="https://devmajxr.co.za" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-[#fca311] transition-colors">
            website by Dev-Majxr
          </Link>
        </div>
      </div>
    </footer>
  )
}