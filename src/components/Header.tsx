'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const toggleMenu = () => {
    setIsTransitioning(true)
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isTransitioning])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/experience", label: "Experience" },
    { href: "/skills", label: "Skills" },
    { href: "/education", label: "Education" },
    { href: "/training", label: "Training" }, // New Training link added here
    { href: "/contact", label: "Contact" },
  ]

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setTimeout(() => {
      router.push(href);
    }, 500);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#14213d] text-[#e5e5e5] shadow-md fixed top-0 left-0 right-0 w-full z-50"
    >
      <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/" className="z-50 flex items-center">
          <Image
            src="/new-logo.png"
            alt="Fuzile Zono Logo"
            width={80}
            height={80}
            className="w-auto h-12 rounded"
          />
          <span className="ml-2 text-xl font-bold">FUZILE ZONO</span>
        </Link>
        <div className="md:hidden z-50">
          <button 
            onClick={toggleMenu} 
            className="w-10 h-10 flex flex-col justify-center items-center focus:outline-none"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <span className={`bg-[#e5e5e5] h-0.5 w-6 rounded-full transform transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`bg-[#e5e5e5] h-0.5 w-6 rounded-full transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100 my-1'}`} />
            <span className={`bg-[#e5e5e5] h-0.5 w-6 rounded-full transform transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
        <AnimatePresence mode="wait">
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="md:hidden fixed inset-0 bg-[#14213d] flex items-center justify-center z-40"
            >
              <ul className="text-center space-y-8">
                {menuItems.map((item, index) => (
                  <motion.li 
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <a
                      href={item.href}
                      className={`text-3xl font-semibold transition-colors ${
                        pathname === item.href ? 'text-[#fca311]' : 'text-[#e5e5e5] hover:text-[#fca311]'
                      }`}
                      onClick={(e) => handleNavigation(e, item.href)}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
        <ul className="hidden md:flex md:space-x-4">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link 
                href={item.href} 
                className={`transition-colors ${
                  pathname === item.href ? 'text-[#fca311]' : 'text-[#e5e5e5] hover:text-[#fca311]'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  )
}