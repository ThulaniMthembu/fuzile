'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '@/lib/firebase'
import { FirebaseError } from 'firebase/app'
import { AlertCircle, Pencil, Trash2, Loader2, FileText, User } from 'lucide-react'
import Image from 'next/image'

const AUTHOR_NAME = "Fuzile Zono"

interface BlogPost {
  id: string
  title: string
  author: string
  date: string
  content: string
  category: string
  imageUrl?: string
  imageMetadata?: {
    name: string
    size: number
    type: string
    lastModified: number
  }
}

const CATEGORIES = [
  "Choose Category",
  "Procurement Strategy",
  "Supply Chain Management",
  "Cost Optimization",
  "Vendor Management",
  "Industry Insights",
  "Best Practices",
  "Case Studies",
  "Technology",
  "Sustainability",
  "Risk Management",
  "Personal"
] as const

type Category = typeof CATEGORIES[number]

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

export default function AdminPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState<Category>("Choose Category")
  const [image, setImage] = useState<File | null>(null)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [fileInfo, setFileInfo] = useState<{ name: string; size: string } | null>(null)

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else {
      fetchBlogPosts()
    }
  }, [user, router])

  const fetchBlogPosts = async () => {
    try {
      const q = query(collection(db, 'blogPosts'), orderBy('date', 'desc'))
      const querySnapshot = await getDocs(q)
      const posts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as BlogPost))
      setBlogPosts(posts)
    } catch (err) {
      console.error('Error fetching blog posts:', err)
      setError('Failed to fetch blog posts')
    }
  }

  const resetForm = () => {
    setTitle('')
    setContent('')
    setCategory("Choose Category")
    setImage(null)
    setImagePreview(null)
    setEditingPost(null)
    setError('')
    setFileInfo(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const validImageTypes = [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'image/gif',
        'image/webp',
        'image/svg+xml',
        'image/tiff',
        'image/bmp'
      ]
      
      if (!validImageTypes.includes(file.type)) {
        setError('Please select a valid image file (JPEG, PNG, GIF, WebP, SVG, TIFF, or BMP)')
        setFileInfo(null)
        return
      }

      if (file.size > 50 * 1024 * 1024) {
        setError('Image size must be less than 50MB')
        setFileInfo(null)
        return
      }

      setImage(file)
      setError('')
      setFileInfo({
        name: file.name,
        size: formatFileSize(file.size)
      })

      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setFileInfo(null)
      setImage(null)
      setImagePreview(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (category === "Choose Category") {
      setError('Please select a category')
      return
    }

    setIsLoading(true)

    try {
      let imageUrl = editingPost?.imageUrl || ''

      if (image) {
        try {
          const storageRef = ref(storage, `blog-images/${image.name}`)
          const metadata = {
            contentType: image.type,
            customMetadata: {
              uploadedBy: user?.email || 'unknown',
              uploadedAt: new Date().toISOString(),
              preserveQuality: 'true',
              originalName: image.name,
              originalSize: image.size.toString()
            }
          }

          const uploadTask = await uploadBytes(storageRef, image, metadata)
          imageUrl = await getDownloadURL(uploadTask.ref)
        } catch (uploadError) {
          console.error('Error uploading image:', uploadError)
          setError('Failed to upload image, but proceeding with post creation')
        }
      }

      const postData = {
        title,
        author: AUTHOR_NAME,
        date: editingPost ? editingPost.date : new Date().toISOString(),
        content,
        category,
        ...(imageUrl && { imageUrl }),
        updatedAt: new Date().toISOString(),
        ...(image && {
          imageMetadata: {
            name: image.name,
            size: image.size,
            type: image.type,
            lastModified: image.lastModified
          }
        })
      }

      if (editingPost) {
        await updateDoc(doc(db, 'blogPosts', editingPost.id), postData)
      } else {
        await addDoc(collection(db, 'blogPosts'), postData)
      }

      resetForm()
      fetchBlogPosts()
    } catch (err) {
      console.error('Error saving blog post:', err)
      if (err instanceof FirebaseError) {
        setError(err.message)
      } else {
        setError('Failed to save blog post')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteDoc(doc(db, 'blogPosts', postId))
        fetchBlogPosts()
      } catch (err) {
        console.error('Error deleting blog post:', err)
        setError('Failed to delete blog post')
      }
    }
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setTitle(post.title)
    setContent(post.content)
    setCategory(post.category as Category)
    setImagePreview(post.imageUrl || null)
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/login')
    } catch (err) {
      console.error('Error logging out:', err)
      setError('Failed to log out')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">
                {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'} 
              </CardTitle>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md flex items-center mb-4">
                <AlertCircle className="h-4 w-4 mr-2" />
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Textarea
                  placeholder="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  disabled={isLoading}
                  className="min-h-[200px]"
                />
              </div>

              <div className="space-y-2">
                <Select
                  value={category}
                  onValueChange={(value) => setCategory(value as Category)}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      cat !== "Choose Category" && (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      )
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-muted-foreground">Image (Optional)</p>
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/jpeg,image/png,image/jpg,image/gif,image/webp,image/svg+xml,image/tiff,image/bmp"
                    disabled={isLoading}
                  />
                  {fileInfo && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      <span>{fileInfo.name}</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        {fileInfo.size}
                      </span>
                    </div>
                  )}
                </div>
                {imagePreview && (
                  <div className="relative w-full h-48 mt-2 bg-muted rounded-lg overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {editingPost ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    editingPost ? 'Update Post' : 'Create Post'
                  )}
                </Button>
                {editingPost && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={resetForm}
                    disabled={isLoading}
                  >
                    Cancel Edit
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Fuzile&apos;s Blog Posts</h2>
          <div className="space-y-4">
            {blogPosts.map((post) => (
              <Card key={post.id} className="relative">
                <CardContent className="flex items-start gap-4 p-6">
                  {post.imageUrl && (
                    <div className="relative w-24 h-24 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold truncate">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">{post.content}</p>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(post)}
                      disabled={isLoading}
                    >
                      <Pencil className="h-4  w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(post.id)}
                      disabled={isLoading}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}