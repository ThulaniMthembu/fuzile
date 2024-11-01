'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
	useForm,
	SubmitHandler,
	UseFormRegister,
	FieldErrors,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { Mail, MapPin, User, Clock, Linkedin } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Name must be at least 2 characters.',
	}),
	email: z.string().email({
		message: 'Please enter a valid email address.',
	}),
	message: z.string().min(10, {
		message: 'Message must be at least 10 characters.',
	}),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormValues>({
		resolver: zodResolver(formSchema),
	});

	useEffect(() => {
		if (
			!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
			!process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
			!process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
		) {
			console.error('EmailJS environment variables are not set correctly');
		}
	}, []);

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		setIsSubmitting(true);
		try {
			await emailjs.send(
				process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
				process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
				{
					from_name: data.name,
					from_email: data.email,
					message: data.message,
				},
				process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
			);
			toast.success("Thank you for your message. I'll get back to you soon!");
			reset();
		} catch (error) {
			console.error('EmailJS error:', error);
			if (error instanceof Error) {
				console.error('Error message:', error.message);
			}
			toast.error(
				'An error occurred. Please try again later or contact us directly.'
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='min-h-screen bg-gradient-to-b from-background to-background/80 py-16 px-4 sm:px-6 lg:px-8'>
			<Toaster position='top-right' />
			<div className='max-w-7xl mx-auto'>
				<PageHeader />
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
					<LeftColumn />
					<RightColumn
						onSubmit={onSubmit}
						isSubmitting={isSubmitting}
						register={register}
						errors={errors}
						handleSubmit={handleSubmit}
					/>
				</div>
			</div>
		</div>
	);
}

function PageHeader() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='text-center mb-12'
		>
			<h1 className='text-4xl font-bold text-primary mb-4'>Get in Touch</h1>
			<p className='text-xl text-muted-foreground'>
				I&apos;m always open to new opportunities and collaborations. Let&apos;s
				connect and explore how we can work together!
			</p>
		</motion.div>
	);
}

function LeftColumn() {
	return (
		<motion.div
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
			className='space-y-8'
		>
			<div className='relative w-64 h-64 mx-auto'>
				<Image
					src='/new-logo.png'
					alt='Fuzile Zono Logo'
					layout='fill'
					objectFit='contain'
					className='rounded-full'
				/>
			</div>
			<div className='text-center'>
				<h2 className='text-3xl font-bold mt-4'>Fuzile Zono</h2>
				<p className='text-lg text-muted-foreground'>Procurement Specialist</p>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
				<ContactInformation />
				<Availability />
			</div>
		</motion.div>
	);
}

function ContactInformation() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Contact Information</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div className='flex items-center space-x-2'>
					<User className='h-5 w-5 text-primary' />
					<span>Fuzile Zono</span>
				</div>
				<div className='flex items-center space-x-2'>
					<Mail className='h-5 w-5 text-primary' />
					<a href='mailto:Fuzile.Zono@Outlook.com' className='hover:underline'>
						Fuzile.Zono@Outlook.com
					</a>
				</div>
				<div className='flex items-start space-x-2'>
					<MapPin className='h-5 w-5 text-primary mt-1' />
					<address className='not-italic'>Cape Town, South Africa (ZA)</address>
				</div>

				<div className='flex items-center space-x-2'>
					<Linkedin className='h-5 w-5 text-primary' />
					<a
						href='https://www.linkedin.com/in/fuzile-zono-197a6a72/'
						target='_blank'
						rel='noopener noreferrer'
						className='hover:underline'
					>
						LinkedIn
					</a>
				</div>
			</CardContent>
		</Card>
	);
}

function Availability() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Availability</CardTitle>
			</CardHeader>
			<CardContent>
				<Tabs defaultValue='hours'>
					<TabsList className='grid w-full grid-cols-2'>
						<TabsTrigger value='hours'>Hours</TabsTrigger>
						<TabsTrigger value='timezone'>Timezone</TabsTrigger>
					</TabsList>
					<TabsContent value='hours' className='space-y-2'>
						<div className='flex items-center space-x-2'>
							<Clock className='h-5 w-5 text-primary' />
							<span>Monday - Friday: 9:00 AM - 5:00 PM</span>
						</div>
					</TabsContent>
					<TabsContent value='timezone' className='space-y-2'>
						<div className='flex items-center space-x-2'>
							<MapPin className='h-5 w-5 text-primary' />
							<span>South African Standard Time (SAST)</span>
						</div>
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
}

interface RightColumnProps {
	onSubmit: SubmitHandler<FormValues>;
	isSubmitting: boolean;
	register: UseFormRegister<FormValues>;
	errors: FieldErrors<FormValues>;
	handleSubmit: (
		onSubmit: SubmitHandler<FormValues>
	) => (e?: React.BaseSyntheticEvent) => Promise<void>;
}

function RightColumn({
	onSubmit,
	isSubmitting,
	register,
	errors,
	handleSubmit,
}: RightColumnProps) {
	return (
		<motion.div
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5, delay: 0.4 }}
			className='space-y-8'
		>
			<Card>
				<CardHeader>
					<CardTitle>Send a Message</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
						<div>
							<Label htmlFor='name'>Name</Label>
							<Input id='name' {...register('name')} />
							{errors.name && (
								<p className='text-sm text-red-500 mt-1'>
									{errors.name.message}
								</p>
							)}
						</div>
						<div>
							<Label htmlFor='email'>Email</Label>
							<Input id='email' type='email' {...register('email')} />
							{errors.email && (
								<p className='text-sm text-red-500 mt-1'>
									{errors.email.message}
								</p>
							)}
						</div>
						<div>
							<Label htmlFor='message'>Message</Label>
							<Textarea id='message' {...register('message')} />
							{errors.message && (
								<p className='text-sm text-red-500 mt-1'>
									{errors.message.message}
								</p>
							)}
						</div>
						<Button type='submit' className='w-full' disabled={isSubmitting}>
							{isSubmitting ? 'Sending...' : 'Send Message'}
						</Button>
					</form>
				</CardContent>
			</Card>
		</motion.div>
	);
}
