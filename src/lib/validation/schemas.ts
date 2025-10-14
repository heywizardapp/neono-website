/**
 * Centralized Zod validation schemas for all forms
 */

import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z.string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  company: z.string()
    .trim()
    .max(200, "Company name must be less than 200 characters")
    .optional(),
  topic: z.enum(['General Inquiry', 'Technical Support', 'Billing & Pricing', 'Partnership Opportunities', 'Press & Media', 'Other']),
  message: z.string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters")
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const demoFormSchema = z.object({
  firstName: z.string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z'-]+$/, "First name can only contain letters, hyphens, and apostrophes"),
  lastName: z.string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z'-]+$/, "Last name can only contain letters, hyphens, and apostrophes"),
  email: z.string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z.string()
    .trim()
    .regex(/^[\d\s()+.-]*$/, "Invalid phone format")
    .optional()
    .or(z.literal('')),
  businessName: z.string()
    .trim()
    .min(2, "Business name must be at least 2 characters")
    .max(200, "Business name must be less than 200 characters"),
  businessType: z.enum(['salon', 'barbershop', 'spa', 'aesthetics', 'nails', 'other']),
  teamSize: z.enum(['1-5', '6-15', '16-30', '31+']),
  currentSoftware: z.string()
    .trim()
    .max(100, "Current software must be less than 100 characters")
    .optional()
    .or(z.literal('')),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  goals: z.string()
    .trim()
    .max(1000, "Goals must be less than 1000 characters")
    .optional()
    .or(z.literal('')),
  hearAboutUs: z.string()
    .trim()
    .max(200, "Response must be less than 200 characters")
    .optional()
    .or(z.literal(''))
});

export type DemoFormData = z.infer<typeof demoFormSchema>;

export const newsletterFormSchema = z.object({
  email: z.string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  industry: z.enum(['salon', 'barbershop', 'spa', 'nails', 'aesthetics', 'massage', 'other']).optional(),
  consent: z.boolean().refine(val => val === true, "You must accept to receive marketing emails")
});

export type NewsletterFormData = z.infer<typeof newsletterFormSchema>;

export const blogPostSchema = z.object({
  title: z.string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title must be less than 200 characters"),
  excerpt: z.string()
    .trim()
    .min(20, "Excerpt must be at least 20 characters")
    .max(300, "Excerpt must be less than 300 characters"),
  content: z.string()
    .trim()
    .min(100, "Content must be at least 100 characters")
    .max(50000, "Content must be less than 50,000 characters"),
  category: z.string()
    .trim()
    .min(2, "Category must be at least 2 characters")
    .max(50, "Category must be less than 50 characters"),
  tags: z.array(z.string().trim().min(2).max(30))
    .min(1, "At least one tag is required")
    .max(10, "Maximum 10 tags allowed"),
  slug: z.string()
    .trim()
    .min(3, "Slug must be at least 3 characters")
    .max(200, "Slug must be less than 200 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  author: z.object({
    name: z.string()
      .trim()
      .min(2, "Author name must be at least 2 characters")
      .max(100, "Author name must be less than 100 characters"),
    avatar: z.string().url("Invalid avatar URL").optional().or(z.literal(''))
  }),
  contentType: z.enum(['blog', 'guide', 'education', 'video', 'case-study']),
  status: z.enum(['draft', 'published']),
  featuredImage: z.string().url("Invalid image URL").optional().or(z.literal('')),
  featured: z.boolean()
});

export type BlogPostFormData = z.infer<typeof blogPostSchema>;

export const roiFormSchema = z.object({
  monthlyClients: z.number()
    .min(1, "Must have at least 1 client per month")
    .max(100000, "Value too high"),
  averageServicePrice: z.number()
    .min(1, "Price must be at least $1")
    .max(10000, "Price too high"),
  noShowRate: z.number()
    .min(0, "Rate cannot be negative")
    .max(100, "Rate cannot exceed 100%"),
  staffCount: z.number()
    .min(1, "Must have at least 1 staff member")
    .max(1000, "Value too high")
});

export type RoiFormData = z.infer<typeof roiFormSchema>;

// ROI Calculator Form Schema
export const roiCalculatorSchema = z.object({
  monthlyClients: z.number().int().min(10, "Must have at least 10 clients").max(10000, "Value too large"),
  averageServicePrice: z.number().min(10, "Must be at least $10").max(1000, "Value too large"),
  noShowRate: z.number().min(0, "Cannot be negative").max(50, "Cannot exceed 50%"),
  staffCount: z.number().int().min(1, "Must have at least 1 staff member").max(100, "Value too large"),
});

export type RoiCalculatorData = z.infer<typeof roiCalculatorSchema>;
