'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, AlertCircle, ImageIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface BlogPost {
  id: string
  title: string
  author: string
  date: string
  content: string
  category: string
  imageUrl: string
}

const formatContent = (content: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return content.split('\n\n').map((paragraph, index) => (
    <p key={index} className="text-muted-foreground">
      {paragraph.split(urlRegex).map((part, i) => 
        urlRegex.test(part) ? (
          <a 
            key={i} 
            href={part} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-primary hover:underline"
          >
            {part}
          </a>
        ) : (
          part
        )
      )}
    </p>
  ));
};

export default function BlogPost() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      if (typeof params.id === 'string') {
        try {
          const docRef = doc(db, 'blogPosts', params.id)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            setPost({ id: docSnap.id, ...docSnap.data() } as BlogPost)
          } else {
            setError('Blog post not found')
          }
        } catch (err) {
          setError('Failed to fetch blog post')
          console.error('Error fetching blog post:', err)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchPost()
  }, [params.id])

  const handleImageError = () => {
    setImageError(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p>Loading blog post...</p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md flex items-center">
          <AlertCircle className="h-4 w-4 mr-2" />
          {error || 'Blog post not found'}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          {post.imageUrl && !imageError ? (
            <div className="relative w-full pt-[56.25%] mb-8 rounded-lg overflow-hidden bg-muted">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="absolute inset-0 w-full h-full object-contain p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 1200px"
                priority
                onError={handleImageError}
                quality={100}
                unoptimized
              />
            </div>
          ) : post.imageUrl ? (
            <div className="w-full pt-[56.25%] mb-8 relative bg-muted rounded-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                <ImageIcon className="h-16 w-16 text-muted-foreground" />
              </div>
            </div>
          ) : null}

          <article className="prose prose-lg dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold text-primary mb-4">{post.title}</h1>
            
            <div className="flex justify-between items-center text-sm text-muted-foreground mb-8">
              <span>{post.author}</span>
              <span>{new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>

            <div className="space-y-4">
              {formatContent(post.content)}
            </div>

            <div className="mt-8">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                {post.category}
              </span>
            </div>
          </article>
        </motion.div>
      </div>
    </div>
  )
}