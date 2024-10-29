'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, Variants, useInView, useAnimation, AnimatePresence } from 'framer-motion'
import { Briefcase, TrendingUp, Leaf, DollarSign, Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const heroData = [
  {
    title: "Innovative Procurement Solutions",
    text: "Transforming businesses through strategic sourcing and cost optimization",
    image: "/background/background-image1.jpg"
  },
  {
    title: "Sustainable Supply Chain Management",
    text: "Creating eco-friendly and efficient supply networks for a better future",
    image: "/background/background-image2.jpg"
  },
  {
    title: "Digital Procurement Transformation",
    text: "Leveraging technology to streamline procurement processes and drive growth",
    image: "/background/background-image3.jpg"
  },
  {
    title: "Global Sourcing Expertise",
    text: "Navigating international markets to find the best value for your business",
    image: "/background/background-image4.jpg"
  },
  {
    title: "Risk Management in Procurement",
    text: "Identifying and mitigating risks to ensure supply chain resilience",
    image: "/background/background-image5.jpg"
  },
  {
    title: "Procurement Analytics and Insights",
    text: "Data-driven decision making for optimized procurement strategies",
    image: "/background/background-image6.jpg"
  }
]

const expertise = [
  {
    icon: Briefcase,
    title: "Strategic Procurement",
    description: "Developing and implementing innovative procurement strategies to optimize costs and improve efficiency."
  },
  {
    icon: TrendingUp,
    title: "Supply Chain Optimization",
    description: "Streamlining supply chain processes to enhance overall operational performance and reduce lead times."
  },
  {
    icon: Leaf,
    title: "Sustainable Procurement",
    description: "Implementing eco-friendly procurement practices to drive sustainability and reduce environmental impact."
  },
  {
    icon: DollarSign,
    title: "Cost Reduction",
    description: "Identifying and executing cost-saving initiatives across the procurement lifecycle."
  },
  {
    icon: Briefcase,
    title: "Vendor Management",
    description: "Building and maintaining strong relationships with suppliers to ensure optimal performance and value."
  },
  {
    icon: TrendingUp,
    title: "Procurement Analytics",
    description: "Leveraging data-driven insights to make informed decisions and improve procurement outcomes."
  }
]

const recommendations = [
  {
    name: "Marginique Abrahams",
    role: "System Administrator at De Beers Marine",
    text: "Fuzile is a very helpful colleague, always goes out of his way to assist! He will definitely be an asset to any organisation!",
    date: "September 15, 2023"
  },
  {
    name: "Ayesha Seedat",
    role: "GeoSurvey Operations Controller @ De Beers Marine",
    text: "I can recommend him as a passionate and diligent professional in his field. He prides himself in his work and has been a great mentor and coach.",
    date: "July 16, 2023"
  },
  {
    name: "Onke Zenzwa",
    role: "Category Buyer at African Marine Solutions (AMSOL)",
    text: "Been privilege to work closer with Fuzile, he was one of the best teammates. He has portrayed stand-out leadership qualities.",
    date: "April 20, 2023"
  },
  {
    name: "Vuyo Njongi",
    role: "Procurement Specialist : Western Provincial Treasury",
    text: "Excellent report writing skills, data analyst, Power BI expert, strong business systems analysis, good negotiator, contract specialist.",
    date: "April 12, 2023"
  },
  {
    name: "DK ZILWA",
    role: "Data driven decision making advocate | Business Intelligence | Data Analysis | PowerBI",
    text: "Outstanding Technical Buyer with exceptional data analysis skills. His proficiency in PowerBI, problem-solving skills are truly impressive.",
    date: "March 21, 2023"
  },
  {
    name: "Stephen William Grobler",
    role: "Technical Consultant at Lifting & Mining Solutions Pry Ltd",
    text: "Fuzile is very knowledgeable in Procurement, Supply and relates well with technical personnel.",
    date: "March 15, 2023"
  },
  {
    name: "Rashid Delie",
    role: "Buyer, De Beers Group",
    text: "Brilliant mind, analytical and concise, one of the best in the SCM business.",
    date: "March 13, 2023"
  },
  {
    name: "Nomvana Marwanqana",
    role: "Key Account Manager at Transnet Port Terminals",
    text: "Fuzile is a highly motivated person who is always pushing himself and who is not scared of challenges..",
    date: "January 20, 2021"
  },
  {
    name: "Mpfuxelelo Makondo",
    role: "Sourcing Specialist, Santam Insurance",
    text: "He's displayed his tenacious character and ability to solve problems through innovation..",
    date: "January 18, 2021"
  },
  {
    name: "Amanda Duli",
    role: "Category Manager - General Services",
    text: "He's honest, dependable, and incredibly hardworking. He is very analytical, digs deeper to address challenges and solves them.",
    date: "January 15, 2021"
  },
  {
    name: "Nokwazi Dlamini",
    role: "TD Creditors Controller at (Engen) Vivo Energy",
    text: "He demonstrates high levels of accuracy and work productivity. All documentations are completed on time with no errors.",
    date: "January 15, 2021"
  },
  {
    name: "Stephan Smit",
    role: "Project Portfolio Management Consultant",
    text: "Highly motivated problem solver with an innovative approach to operational and strategic challenges an asset to any team!",
    date: "January 15, 2021"
  },
  {
    name: "Pati Dumisani, Pr. Eng",
    role: "Project Manager & Alternative Energy Developer at Engen",
    text: "He consistently demonstrates professionalism and stakeholder focus, achieving quick turnaround times for his team and business.",
    date: "January 15, 2021"
  }
]

export default function Component() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroData.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const cardVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 }
    }
  }

  const heroRef = useRef(null)
  const expertiseRef = useRef(null)
  const recommendationsRef = useRef(null)
  const ctaRef = useRef(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  
  const [isPaused, setIsPaused] = useState(false)
  const scrollAnimation = useAnimation()

  const heroInView = useInView(heroRef, { once: true, amount: 0.5 })
  const expertiseInView = useInView(expertiseRef, { once: true, amount: 0.2 })
  const recommendationsInView = useInView(recommendationsRef, { once: true, amount: 0.2 })
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 })

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const totalWidth = recommendations.length * 320
    setMaxScroll(totalWidth - window.innerWidth)

    if (!isPaused) {
      scrollAnimation.start({
        x: -maxScroll,
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 60,
            ease: "linear",
          },
        },
      })
    } else {
      scrollAnimation.stop()
    }

    return () => {
      if (isMounted) {
        scrollAnimation.stop()
      }
    }
  }, [scrollAnimation, isPaused, maxScroll, isMounted])

  useEffect(() => {
    if (!isMounted) return

    const initializeAnimation = () => {
      scrollAnimation.set({ x: 0 })
      setScrollPosition(0)
    }

    window.requestAnimationFrame(initializeAnimation)
  }, [scrollAnimation, isMounted])

  const handlePauseResume = () => {
    setIsPaused(!isPaused)
  }

  const handlePrevious = () => {
    if (!isMounted) return
    scrollAnimation.stop()
    const newPosition = Math.min(scrollPosition + 320, 0)
    setScrollPosition(newPosition)
    scrollAnimation.start({
      x: newPosition,
      transition: { duration: 0.5 }
    })
  }

  const handleNext = () => {
    if (!isMounted) return
    scrollAnimation.stop()
    const newPosition = Math.max(scrollPosition - 320, -maxScroll)
    setScrollPosition(newPosition)
    scrollAnimation.start({
      x: newPosition,
      transition: { duration: 0.5 }
    })
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      variants={containerVariants}
      className="bg-gradient-to-b from-background to-background/80"
    >
      <div className="min-h-screen relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHeroIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div className="relative w-full h-full">
              <Image
                src={heroData[currentHeroIndex].image}
                alt={heroData[currentHeroIndex].title}
                fill
                className="object-cover"
                quality={100}
                priority
                sizes="100vw"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 min-h-screen flex items-center">
          <div className="container mx-auto px-4">
            <motion.div 
              ref={heroRef}
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              <motion.h1
                key={`title-${currentHeroIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-6xl font-bold mb-4"
              >
                {heroData[currentHeroIndex].title}
              </motion.h1>
              <motion.p
                key={`text-${currentHeroIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl md:text-2xl mb-8"
              >
                {heroData[currentHeroIndex].text}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button asChild size="lg" className="mr-4 bg-[#fca311] text-[#14213d] hover:bg-[#fca311]/90">
                  <Link href="/about">Learn More</Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-white hover:text-[#14213d]"
                >
                  <Link href="/contact">Get in touch</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <motion.section 
          ref={expertiseRef}
          initial={{ opacity: 0, y: 50 }}
          animate={expertiseInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-12 text-center">Key Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertise.map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate={expertiseInView ? "visible" : "hidden"}
                whileHover="hover"
              >
                <Card className="h-full bg-card overflow-hidden group border border-[#14213d] hover:border-[#14213d]/60 transition-colors duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          ref={recommendationsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={recommendationsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 overflow-hidden bg-gray-50 py-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-center text-[#14213d]">Recommendations</h2>
          <p className="text-center text-gray-600 mb-8">These summarized recommendations are from LinkedIn, showcasing my professional impact and collaborations.</p>
          <div className="flex justify-center space-x-4 mb-4">
            <Button onClick={handlePrevious} variant="outline" size="icon" disabled={scrollPosition === 0}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button onClick={handlePauseResume} variant="outline" size="icon">
              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </Button>
            <Button onClick={handleNext} variant="outline" size="icon" disabled={scrollPosition <= -maxScroll}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div 
            ref={scrollRef}
            className="flex snap-x snap-mandatory pb-4 w-full"
          >
            <motion.div 
              className="flex w-[3600px]"
              animate={scrollAnimation}
            >
              {[...recommendations, ...recommendations].map((recommendation, index) => (
                <Card key={index} className="flex-shrink-0 w-[300px] mx-4 bg-white shadow-sm rounded-lg overflow-hidden border-t-4 border-[#fca311] card-hover-effect">
                  <CardContent className="p-6">
                    <h3 className="font-medium text-lg mb-1 text-[#14213d]">{recommendation.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{recommendation.role}</p>
                    <p className="text-sm mb-4 line-clamp-4 text-gray-700">{recommendation.text}</p>
                    <p className="text-xs text-gray-400 mt-auto">{recommendation.date}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          ref={ctaRef}
          initial={{ opacity: 0, y: 50 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Procurement?</h2>
          <p className="text-xl mb-6">Let&apos;s discuss how I can help drive efficiency and sustainability in your organization.</p>
          <Button asChild size="lg">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </motion.section>
      </div>
    </motion.div>
  )
}