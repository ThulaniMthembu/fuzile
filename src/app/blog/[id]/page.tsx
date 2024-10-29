'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface BlogPost {
  id: number
  title: string
  author: string
  date: string
  content: string
  category: string
}

const blogPosts: BlogPost[] = [
  
]

export default function BlogPost() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    const postId = Number(params.id)
    const foundPost = blogPosts.find(p => p.id === postId)
    setPost(foundPost || null)
  }, [params.id])

  if (!post) {
    return <div>Post not found</div>
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
          <h1 className="text-4xl font-bold text-primary mb-4">{post.title}</h1>
          <div className="flex justify-between items-center text-sm text-muted-foreground mb-8">
            <span>{post.author}</span>
            <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="prose prose-lg dark:prose-invert">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 text-sm text-muted-foreground">
            Category: {post.category}
          </div>
        </motion.div>
      </div>
    </div>
  )
}