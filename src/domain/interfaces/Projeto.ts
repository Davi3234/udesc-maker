import type { ImageData } from "../../@types/image"

export enum ProjetoLevel {
  Iniciante = 'iniciante',
  Intermediario = 'intermediário',
  Avancado = 'avançado',
}

export interface Projeto {
  slug: string
  titulo: string
  resumo?: string
  descricao?: string
  level: ProjetoLevel
  categoria: string
  tags: string[]
  idadeMinima?: number
  duracao?: number
  autor: string
  imagem?: ImageData
}
