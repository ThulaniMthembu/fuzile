import React from 'react'
import { Mail, MapPin, Linkedin, Facebook, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#14213d] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-left mb-8">
          <h2 className="text-4xl font-bold text-[#fca311] mb-2">Fuzile Zono</h2>
          <p className="text-xl">Innovative Procurement Specialist</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-[#fca311] font-semibold text-2xl mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-[#fca311]" />
                <a href="mailto:fuzile@example.com" className="hover:text-[#fca311] transition-colors">
                  fuzile@example.com
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
                <Linkedin size={24} />
              </a>
              <a 
                href="https://www.facebook.com/fuzilezono" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-[#fca311] transition-colors"
                aria-label="Facebook Profile"
              >
                <Facebook size={24} />
              </a>
              <a 
                href="https://twitter.com/fuzilezono" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-[#fca311] transition-colors"
                aria-label="Twitter Profile"
              >
                <Twitter size={24} />
              </a>
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
              <li>Public Sector</li>
              <li>Manufacturing</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-600 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Fuzile Zono. All rights reserved.</p>
        </div>
        <div className="mt-4 text-center text-xs text-gray-500">
          <a href="https://devmajxr.co.za" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-[#fca311] transition-colors">
            website by Dev-Majxr
          </a>
        </div>
      </div>
    </footer>
  )
}