'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, Variants, useInView, useAnimation } from 'framer-motion'
import { ArrowRight, Briefcase, TrendingUp, Leaf, DollarSign, Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const blobVariants: Variants = {
  animate: {
    borderRadius: [
      '60% 40% 30% 70%/60% 30% 70% 40%',
      '30% 60% 70% 40%/50% 60% 30% 60%',
      '60% 40% 30% 70%/60% 30% 70% 40%'
    ],
    transition: {
      duration: 8,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
}

export default function Home() {
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
      text: "Fuzile is a very helpful colleague, always goes out of his way to assist! He will definitely be an asset to any organisation as he is intelligent, eager and a team player!",
      date: "September 15, 2023"
    },
    {
      name: "Ayesha Seedat",
      role: "GeoSurvey Operations Controller @ De Beers Marine",
      text: "I have worked with Fuzile and can recommend him as a passionate and diligent professional in his field. He prides himself in his work and has been a great mentor and coach. In his work, Fuzile has demonstrated a high level of professionalism, integrity, and commitment.",
      date: "July 16, 2023"
    },
    {
      name: "Onke Zenzwa",
      role: "Category Buyer at African Marine Solutions (AMSOL)",
      text: "Been privilege to work closer with Fuzile, he was one of the best teammate. He has portrayed stand-out leadership qualities. He is such an asset to the organisation and he is always willing to groom others to become better.",
      date: "April 20, 2023"
    },
    {
      name: "Vuyo Njongi",
      role: "Procurement Specialist : Western Provincial Treasury",
      text: "Excellent report writing skills, data analyst, Power BI expect, strong business systems analysis, good negotiator, contract specialist.",
      date: "April 12, 2023"
    },
    {
      name: "DK ZILWA",
      role: "Data driven decision making advocate | Business Intelligence | Data Analysis | PowerBI",
      text: "I am pleased to recommend Fuzile Zono for his exceptional skills and capabilities in technical buying, data analysis, and the use of Power BI. His proficiency in PowerBI and his analytical and problem-solving skills are truly impressive.",
      date: "March 21, 2023"
    },
    {
      name: "Stephen William Grobler",
      role: "Technical Consultant at Lifting & Mining Solutions Pry Ltd",
      text: "Fuzile is a very knowledgeable in Procucurment, Supply and Relates well with Technical personal...",
      date: "March 15, 2023"
    },
    {
      name: "Rashid Delie",
      role: "Buyer , De Beers Group",
      text: "Brilliant mind, analytical and concise, one of the best in the SCM business",
      date: "March 13, 2023"
    },
    {
      name: "Nomvana Marwanqana",
      role: "Top 5 finalist in the Rising Stars Awards. category: Transport, Logistics & Security 2018. Key Account Manager at Transnet Port Terminals",
      text: "Fuzile is a highly motivated person who is always pushing himself and who is not scared of challenges. That I saw when he left Transnet (which would be considered a safe zone) and went to a private company where he works now.",
      date: "January 20, 2021"
    },
    {
      name: "Mpfuxelelo Makondo",
      role: "Sourcing Specialist, Santam Insurance",
      text: "When I think about an exceptional value driven individual, Fuzile Zono comes to my mind. I've had the pleasure of working closely with Fuzile on a daily basis and on several projects where he has displayed his tenacious character and ability to solve problems through innovation.",
      date: "January 18, 2021"
    },
    {
      name: "Amanda Duli",
      role: "Category Manager - General Services",
      text: "It's my absolute pleasure to recommend Fuzile Zono. Fuzile and I are colleagues at Engen. I thoroughly enjoy working with Fuzile Zono. I came to know him as a truly valuable asset to our team. He is honest, dependable, and incredibly hardworking.",
      date: "January 15, 2021"
    },
    {
      name: "Nokwazi Dlamini",
      role: "TD Creditors Controller at (Engen) Vivo Energy",
      text: "Fuzile Zono Managers and co-workers have commented on high levels of accuracy and work productivity. Takes pride in work and strives to improve work performance. All memos, reports, forms and correspondence are completed on time with no errors.",
      date: "January 15, 2021"
    },
    {
      name: "Stephan Smit",
      role: "Project Portfolio Management Consultant || Project Office Implementor",
      text: "Fuzile is highly motivated and a problem solver! His innovative mindset to tackle operational and strategic challenges is what makes him an asset to any team!",
      date: "January 15, 2021"
    },
    {
      name: "Pati Dumisani, Pr. Eng",
      role: "Project Manager & Alternative Energy Developer at Engen",
      text: "He has consistently demonstrated high levels of professionalism and stakeholder focus. In a mix of emergencies, breakdowns and project work, he has obtained quick turnaround times for his team and business.",
      date: "January 15, 2021"
    }
  ]

  const heroRef = useRef(null)
  const expertiseRef = useRef(null)
  const recommendationsRef = useRef(null)
  const ctaRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true, amount: 0.5 })
  const expertiseInView = useInView(expertiseRef, { once: true, amount: 0.2 })
  const recommendationsInView = useInView(recommendationsRef, { once: true, amount: 0.2 })
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 })

  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const scrollAnimation = useAnimation()

  useEffect(() => {
    if (!isPaused) {
      scrollAnimation.start({
        x: [0, -2000],
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
  }, [scrollAnimation, isPaused])

  const handlePauseResume = () => {
    setIsPaused(!isPaused)
  }

  const handlePrevious = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' })
    }
  }

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' })
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      variants={containerVariants}
      className="bg-gradient-to-b from-background to-background/80"
    >
      <div className="min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <motion.div 
            ref={heroRef}
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-between"
          >
            <div className="md:hidden w-full mb-8">
              <motion.div
                variants={blobVariants}
                animate="animate"
                className="w-[300px] h-[300px] mx-auto overflow-hidden"
              >
                <Image
                  src="/fuzile.jpeg"
                  alt="Fuzile Zono"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
                <span className="text-[#14213d]">F</span>uzile <span className="text-[#14213d]">Z</span>ono
              </h1>
              <h2 className="text-2xl md:text-3xl text-muted-foreground mb-4">
                Innovative Procurement Specialist
              </h2>
              <p className="text-xl mb-6 text-secondary">
                Transforming procurement strategies with over a decade of expertise.
              </p>
              <p className="text-lg mb-6">
                With over 11 years of experience in Oil & Gas, Mining, and Public Procurement, I specialize in:
              </p>
              <ul className="list-none space-y-2 mb-6">
                <li className="flex items-center">
                  <DollarSign className="mr-2 text-primary" />
                  Cutting costs
                </li>
                <li className="flex items-center">
                  <TrendingUp className="mr-2 text-primary" />
                  Boosting efficiency
                </li>
                <li className="flex items-center">
                  <Leaf className="mr-2 text-primary" />
                  Driving sustainability
                </li>
              </ul>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/about" className="flex items-center">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  asChild 
                  className="bg-secondary hover:bg-secondary/90 text-[#fca311]"
                >
                  <Link href="/experience" className="flex items-center">
                    View Experience <Briefcase className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block md:w-1/2">
              <motion.div
                variants={blobVariants}
                animate="animate"
                className="w-[400px] h-[400px] mx-auto overflow-hidden"
              >
                <Image
                  src="/fuzile.jpeg"
                  alt="Fuzile Zono"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
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
          className="mb-16 overflow-hidden"
        >
          <h2 className="text-4xl font-bold mb-12 text-center">Recommendations</h2>
          <div className="flex justify-center space-x-4 mb-4">
            <Button onClick={handlePrevious} variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button onClick={handlePauseResume} variant="outline" size="icon">
              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </Button>
            <Button onClick={handleNext} variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div 
            ref={scrollRef}
            className="flex overflow-x-hidden"
          >
            <motion.div 
              className="flex"
              animate={scrollAnimation}
            >
              {[...recommendations, ...recommendations].map((recommendation, index) => (
                <Card key={index} className="flex-shrink-0 w-[300px] mx-4 bg-card overflow-hidden group border border-[#14213d] hover:border-[#14213d]/60 transition-colors duration-300">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-1">{recommendation.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{recommendation.role}</p>
                    <p className="text-sm mb-4 line-clamp-4">{recommendation.text}</p>
                    <p className="text-xs text-muted-foreground">{recommendation.date}</p>
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