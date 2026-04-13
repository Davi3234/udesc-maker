import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';
import { ProjetoLevel } from './domain/interfaces/Projeto';

const projetos = defineCollection({
  loader: glob({ pattern: '**/content.md', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    titulo: z.string(),
    destaque: z.coerce.boolean().default(false),
    autor: z.string(),
    descricao: z.string().optional(),
    resumo: z.string().optional(),
    level: z.enum(ProjetoLevel).default(ProjetoLevel.Iniciante),
    categoria: z.string().default('Geral'),
    tags: z.array(z.string()).default([]),
    idadeMinima: z.int().nonnegative().optional(),
    duracao: z.number().nonnegative().optional(),
    imagem: image().optional(),
  }),
});

export const collections = { projetos };
