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
  {
    id: 1,
    title: "The Future of Procurement: AI and Machine Learning",
    author: "Fuzile Zono",
    date: "2023-06-15",
    content: "Artificial intelligence and machine learning are revolutionizing the procurement industry. These technologies are enabling more efficient processes, better decision-making, and predictive analytics that can help organizations stay ahead of market trends. In this post, we'll explore how AI and ML are being applied in procurement and what it means for the future of the industry.\n\nOne of the key areas where AI is making a significant impact is in spend analysis. Machine learning algorithms can quickly process vast amounts of procurement data, identifying patterns and anomalies that might be missed by human analysts. This can lead to more accurate spend categorization, better identification of savings opportunities, and improved supplier management.\n\nAnother exciting application of AI in procurement is in contract management. Natural language processing (NLP) techniques can be used to analyze contract terms, identify risks, and even suggest improvements. This not only saves time but also helps organizations minimize legal and financial risks associated with supplier agreements.\n\nPredictive analytics powered by machine learning is also transforming demand forecasting and inventory management. By analyzing historical data and external factors, these systems can provide more accurate predictions of future demand, helping organizations optimize their inventory levels and reduce costs associated with overstocking or stockouts.\n\nHowever, the adoption of AI and ML in procurement also comes with challenges. Organizations need to ensure they have clean, high-quality data to feed these systems. There's also a need for procurement professionals to upskill and learn how to work alongside these new technologies.\n\nAs we look to the future, it's clear that AI and machine learning will play an increasingly important role in procurement. Organizations that embrace these technologies and adapt their processes accordingly will be well-positioned to achieve greater efficiency, cost savings, and strategic value from their procurement functions.",
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
  },
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