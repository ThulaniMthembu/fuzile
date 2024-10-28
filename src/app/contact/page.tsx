'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm, SubmitHandler, UseFormRegister, FieldErrors } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image'
import { Mail, MapPin, User, Clock, Phone, Linkedin, Twitter, Facebook } from 'lucide-react'

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true)
    // Here you would typically send the form data to your server or a third-party service
    console.log(data)
    await new Promise(resolve => setTimeout(resolve, 2000)) // Simulating API call
    setIsSubmitting(false)
    setSubmitStatus('success')
    reset()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <PageHeader />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <LeftColumn />
          <RightColumn 
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            submitStatus={submitStatus}
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}

function PageHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold text-primary mb-4">Get in Touch</h1>
      <p className="text-xl text-muted-foreground mb-8">
        I&apos;m always open to new opportunities and collaborations. Let&apos;s connect and explore how we can work together!
      </p>
    </motion.div>
  )
}

function LeftColumn() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-8"
    >
      <Image
        src="/logo-details.png"
        alt="Contact illustration"
        width={500}
        height={500}
        className="rounded-lg shadow-lg w-full"
      />
      <ContactInformation />
      <Availability />
    </motion.div>
  )
}

function ContactInformation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <User className="h-5 w-5 text-primary" />
          <span>Fuzile Zono</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="h-5 w-5 text-primary" />
          <span>+27 12 345 6789</span>
        </div>
        <div className="flex items-center space-x-2">
          <Mail className="h-5 w-5 text-primary" />
          <a href="mailto:fuzile@example.com" className="hover:underline">fuzile@example.com</a>
        </div>
        <div className="flex items-start space-x-2">
          <MapPin className="h-5 w-5 text-primary mt-1" />
          <address className="not-italic">
            Cape Town, South Africa (ZA)
          </address>
        </div>
      </CardContent>
    </Card>
  )
}

function Availability() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="hours">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="hours">Hours</TabsTrigger>
            <TabsTrigger value="timezone">Timezone</TabsTrigger>
          </TabsList>
          <TabsContent value="hours" className="space-y-2">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Monday - Friday: 9:00 AM - 5:00 PM</span>
            </div>
          </TabsContent>
          <TabsContent value="timezone" className="space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>South African Standard Time (SAST)</span>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

interface RightColumnProps {
  onSubmit: SubmitHandler<FormValues>;
  isSubmitting: boolean;
  submitStatus: 'idle' | 'success' | 'error';
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  handleSubmit: (onSubmit: SubmitHandler<FormValues>) => (e?: React.BaseSyntheticEvent) => Promise<void>;
}

function RightColumn({ onSubmit, isSubmitting, submitStatus, register, errors, handleSubmit }: RightColumnProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="space-y-8"
    >
      <ContactForm 
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
      />
      {submitStatus === 'success' && (
        <p className="mt-4 text-green-600">Thank you for your message. I&apos;ll get back to you soon!</p>
      )}
      {submitStatus === 'error' && (
        <p className="mt-4 text-red-600">An error occurred. Please try again later.</p>
      )}
      <FAQ />
      <SocialMedia />
    </motion.div>
  )
}

interface ContactFormProps {
  onSubmit: SubmitHandler<FormValues>;
  isSubmitting: boolean;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  handleSubmit: (onSubmit: SubmitHandler<FormValues>) => (e?: React.BaseSyntheticEvent) => Promise<void>;
}

function ContactForm({ onSubmit, isSubmitting, register, errors, handleSubmit }: ContactFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Send a Message</CardTitle>
        <CardDescription>Fill out the form below to get in touch with me.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...register("email")} />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" {...register("message")} />
              {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
            </div>
          </div>
          <CardFooter className="flex justify-between mt-4 px-0">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}

function FAQ() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What services do you offer?</AccordionTrigger>
            <AccordionContent>
              I specialize in innovative procurement strategies, supply chain optimization, and strategic sourcing solutions. My services include procurement process improvement, supplier relationship management, and implementation of cutting-edge procurement technologies.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How can I schedule a consultation?</AccordionTrigger>
            <AccordionContent>
              You can schedule a consultation by filling out the contact form on this page or by sending an email directly to fuzile@example.com. I&apos;ll get back to you within 24-48 hours to arrange a suitable time for our discussion.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Do you work with international clients?</AccordionTrigger>
            <AccordionContent>
              Yes, I work with clients globally. My expertise in procurement and supply chain management is applicable across various industries and geographical locations. I&apos;m comfortable with remote collaboration and can adapt to different time zones.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>What industries do you specialize in?</AccordionTrigger>
            <AccordionContent>
              While my procurement strategies are adaptable to various sectors, I have extensive experience in manufacturing, technology, healthcare, and retail industries. However, I&apos;m always excited to take on new challenges in different sectors.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

function SocialMedia() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect on Social Media</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center space-x-4">
        <Button variant="outline" size="icon">
          <Linkedin className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Twitter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Facebook className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}