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
  {
    id: 1,
    title: "The Future of Procurement: AI and Machine Learning",
    author: "Fuzile Zono",
    date: "2023-06-15",
    content: "Artificial intelligence and machine learning are revolutionizing the procurement industry. These technologies are enabling more efficient processes, better decision-making, and predictive analytics that can help organizations stay ahead of market trends...",
    category: "Technology"
  },
  {
    id: 2,
    title: "Sustainable Procurement Practices for 2023",
    author: "Jane Doe",
    date: "2023-05-22",
    content: "Sustainable procurement is no longer just a trend, but a necessity. Organizations are increasingly focusing on environmental, social, and governance (ESG) factors in their procurement processes. This article explores the latest trends in sustainable procurement and how they can benefit your organization...",
    category: "Sustainability"
  },
  {
    id: 3,
    title: "Navigating Global Supply Chain Disruptions",
    author: "John Smith",
    date: "2023-04-10",
    content: "Global supply chains have faced unprecedented challenges in recent years. From the COVID-19 pandemic to geopolitical tensions, organizations need to be prepared for disruptions. This post discusses strategies to mitigate risks and maintain operational efficiency in the face of global supply chain challenges...",
    category: "Supply Chain"
  }
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