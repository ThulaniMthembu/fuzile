'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { LogOut, CircleUserRound } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

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
    { href: "/training", label: "Training" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" }
  ]

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setTimeout(() => {
      router.push(href);
    }, 500);
  };

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/login')
    } catch (error) {
      console.error('Failed to log out:', error)
    }
  }

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
        </Link>

        {/* Mobile Menu Button and Controls */}
        <div className="md:hidden flex items-center gap-4 z-50">
          {/* Admin Controls - Always visible on mobile */}
          {user ? (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-[#e5e5e5] hover:text-[#fca311] flex items-center gap-2"
                asChild
              >
                <Link href="/admin">
                  <CircleUserRound className="h-4 w-4" />
                  <span className="text-sm">Fuzile</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-[#e5e5e5] hover:text-[#fca311] flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Logout</span>
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="text-[#fca311] border-[#fca311] hover:bg-[#fca311] hover:text-[#14213d]"
              asChild
            >
              <Link href="/login">
                <span className="text-sm font-bold">Login</span>
              </Link>
            </Button>
          )}

          {/* Hamburger Menu Button */}
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
              className="md:hidden fixed inset-0 bg-[#14213d] flex items-start pt-24 px-8 z-40"
            >
              <ul className="w-full space-y-8">
                {menuItems.map((item, index) => (
                  <motion.li 
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <a
                      href={item.href}
                      className={`text-3xl font-semibold transition-colors block ${
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

        {/* Desktop Navigation */}
        <ul className="hidden md:flex md:items-center md:space-x-4">
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
          <li className="ml-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#e5e5e5] hover:text-[#fca311] flex items-center gap-2"
                  asChild
                >
                  <Link href="/admin">
                    <CircleUserRound className="h-4 w-4" />
                    Fuzile
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-[#e5e5e5] hover:text-[#fca311] flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="text-[#fca311] border-[#fca311] hover:bg-[#fca311] hover:text-[#14213d]"
                asChild
              >
                <Link href="/login">
                  <span className="font-bold">Login</span>
                </Link>
              </Button>
            )}
          </li>
        </ul>
      </nav>
    </motion.header>
  )
}