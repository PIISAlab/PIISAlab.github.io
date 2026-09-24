import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { load } from 'js-yaml';
import { z } from 'astro/zod';

// file() loader that records each entry's position, so pages can keep the YAML order (Astro sorts entries by id).
const ordered = (path: string) =>
	file(path, { parser: (text) => (load(text) as Record<string, unknown>[]).map((entry, order) => ({ ...entry, order })) });
const order = z.number().int();

// A string shown in both languages, or a {vi, en} pair when the text differs.
const bi = z.union([z.string(), z.object({ vi: z.string(), en: z.string() })]);

const people = defineCollection({
	loader: ordered('src/data/people.yaml'),
	schema: z.object({
		order,
		name: bi,
		role: z.enum(['pi', 'postdoc', 'phd', 'masters', 'undergrad']),
		status: z.enum(['current', 'alumni']),
		cohort: z.string().optional(),
		photo: z.string().optional(),
		bio: z.object({ vi: z.array(z.string()), en: z.array(z.string()) }).optional(),
		thesis: z
			.object({
				kind: z.enum(['senior-thesis', 'masters-thesis', 'phd-dissertation']),
				tentative: z.boolean().optional(),
				title: bi,
				abstract: bi.optional(),
			})
			.optional(),
		firstJob: z.object({ name: bi, url: z.string().url().optional() }).optional(),
	}),
});

const publications = defineCollection({
	loader: ordered('src/data/publications.yaml'),
	schema: z.object({
		order,
		label: z.string(),
		type: z.enum(['journal', 'conference', 'patent', 'domestic-journal', 'domestic-conference', 'thesis']),
		title: z.string(),
		authors: z.string(),
		venue: z.string(),
		year: z.number().int(),
		status: z.enum(['accepted']).optional(),
		doi: z.string().regex(/^10\.\S+$/).optional(),
		url: z.string().url().optional(),
	}),
});

const news = defineCollection({
	loader: ordered('src/data/news.yaml'),
	schema: z.object({
		order,
		date: z.coerce.date(),
		text: bi,
		link: z.string().optional(),
	}),
});

const research = defineCollection({
	loader: ordered('src/data/research.yaml'),
	schema: z.object({
		order,
		icon: z.enum(['chip', 'circuit', 'signal']),
		image: z.string(),
		imageAlt: bi,
		title: bi,
		summary: bi,
		description: bi,
	}),
});

export const collections = { people, publications, news, research };
