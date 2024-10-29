'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '@/lib/firebase'
import { 
  User, 
  onAuthStateChanged, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth'
import { FirebaseError } from 'firebase/app'

interface AuthContextType {
  user: User | null
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  error: string | null
}

const ALLOWED_EMAILS = ['egiefuz@gmail.com', 'thulanim457@gmail.com']

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .catch((error) => {
        console.error('Error setting persistence:', error)
      })

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && !ALLOWED_EMAILS.includes(user.email || '')) {
        signOut(auth)
        setError('Unauthorized email address')
        return
      }
      setUser(user)
      setError(null)
    })

    return () => unsubscribe()
  }, [])

  const loginWithGoogle = async () => {
    try {
      setError(null)
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({
        prompt: 'select_account'
      })
      const result = await signInWithPopup(auth, provider)
      
      if (!ALLOWED_EMAILS.includes(result.user.email || '')) {
        await signOut(auth)
        setError('Unauthorized email address')
        throw new Error('Unauthorized email address')
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case 'auth/popup-closed-by-user':
            setError('Sign in was cancelled')
            break
          case 'auth/popup-blocked':
            setError('Sign in popup was blocked by the browser')
            break
          case 'auth/unauthorized-domain':
            setError('This domain is not authorized for Google sign in')
            break
          case 'auth/cancelled-popup-request':
            setError('Sign in cancelled')
            break
          case 'auth/account-exists-with-different-credential':
            setError('An account already exists with a different sign-in method')
            break
          default:
            console.error('Firebase Auth Error:', err.code, err.message)
            setError('An error occurred during Google sign in. Please try again.')
        }
      } else {
        console.error('Non-Firebase Auth Error:', err)
        setError((err as Error).message)
      }
      throw err
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setError(null)
    } catch (err) {
      console.error('Logout Error:', err)
      setError('Failed to log out')
      throw err
    }
  }

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}