'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'

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

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-primary mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground">
            Insights and thoughts on procurement, supply chain management, and industry trends.
          </p>
        </motion.div>

        <div className="mb-8">
          <Input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                    <span>{post.author}</span>
                    <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <p className="text-muted-foreground mb-4">{post.content.substring(0, 150)}...</p>
                  <div className="text-sm text-muted-foreground">
                    <span>{post.category}</span>
                  </div>
                </CardContent>
                <div className="p-4 pt-0">
                  <Button asChild className="w-full bg-[#fca311] text-[#14213d] hover:bg-[#fca311]/90">
                    <Link href={`/blog/${post.id}`}>Read More</Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}