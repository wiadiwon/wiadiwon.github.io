import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const pubSchema = z.object({
  title: z.string(),
  authors: z.array(z.string()),
  year: z.number(),
  venue: z.string(),
  status: z.enum(["published", "under_review", "preprint"]),
  featured: z.boolean().default(false),
  keywords: z.array(z.string()),
  abstract: z.string(),
  pdf: z.string().url().optional(),
  code: z.string().url().optional(),
  doi: z.string().optional(),
  bibtex: z.string().optional(),
  image: z.string().optional(),
  slug: z.string(),
});

const projSchema = z.object({
  title: z.string(),
  category: z.enum(["funded", "academic", "industry"]),
  role: z.string(),
  period: z.string(),
  teamSize: z.number().optional(),
  summary: z.string(),
  keywords: z.array(z.string()),
  featured: z.boolean().default(false),
  heroGradient: z.string().default("from-indigo-900 to-slate-900"),
  relatedPublications: z.array(z.string()).optional(),
  hasDetail: z.boolean().default(true),
  slug: z.string(),
});

const publicationsEn = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/publications/en" }),
  schema: pubSchema,
});

const publicationsKo = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/publications/ko" }),
  schema: pubSchema,
});

const projectsEn = defineCollection({
  loader: glob({ pattern: "*.{md,mdx}", base: "./src/content/projects/en" }),
  schema: projSchema,
});

const projectsKo = defineCollection({
  loader: glob({ pattern: "*.{md,mdx}", base: "./src/content/projects/ko" }),
  schema: projSchema,
});

export const collections = { publicationsEn, publicationsKo, projectsEn, projectsKo };
