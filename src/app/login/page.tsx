'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [pageLoaded, setPageLoaded] = useState(false)
  const { loginWithGoogle, error: authError, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/admin')
    }
  }, [user, router])

  useEffect(() => {
    // Trigger loading animation after component mounts
    setPageLoaded(true)
  }, [])

  const handleGoogleLogin = async () => {
    setIsLoading(true)

    try {
      await loginWithGoogle()
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate={pageLoaded ? "visible" : "hidden"}
      variants={containerVariants}
      className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8"
    >
      <motion.div
        variants={itemVariants}
        className="w-full max-w-md space-y-4 text-center mb-6"
      >
        <h1 className="text-4xl font-bold tracking-tight text-[#fca311]">
          Welcome Back Fuzile...
        </h1>
        <p className="text-lg text-muted-foreground">
          Access your dashboard to manage your content.
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="w-full max-w-md border-0 bg-[#14213d] backdrop-blur-sm shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#14213d]/20 to-[#14213d]/30 opacity-50 rounded-lg" />
          <CardHeader className="space-y-2 relative">
            <CardTitle className="text-2xl font-bold text-center text-[#fca311]">
              Admin Login
            </CardTitle>
            <CardDescription className="text-center text-base text-[#e5e5e5]">
              Continue with Google to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 relative">
            {authError && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-red-900/20 text-red-400 text-sm p-3 rounded-md flex items-center"
              >
                <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{authError}</span>
              </motion.div>
            )}

            <div className="p-4 rounded-lg bg-[#14213d]/40 shadow-sm">
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full h-12 text-base font-medium bg-[#e5e5e5] hover:bg-[#fca311] text-[#14213d] hover:text-[#14213d] border-2 border-transparent hover:border-[#fca311] transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#fca311]/20 to-[#fca311]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div 
                  className="flex items-center justify-center space-x-3 relative z-10"
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                    <path fill="#4285f4" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                  </svg>
                  <span className="group-hover:scale-105 transition-transform duration-300">
                    {isLoading ? 'Authenticating...' : 'Continue with Google'}
                  </span>
                </motion.div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="w-full max-w-md space-y-4 text-center mt-6"
      >
        <h1 className="text-3xl font-bold tracking-tight text-[#fca311]">
          Only Fuzile Zono can access this area!!!
        </h1>
      </motion.div>
    </motion.div>
  )
}