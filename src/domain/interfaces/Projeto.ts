export type ProjetoLevel = "iniciante" | "intermediário" | "avançado"

export interface Projeto {
  slug: string
  titulo: string
  resumo: string
  descricao: string
  level: ProjetoLevel
  categoria: string
  tags: string[]
  idadeMinima: number
  duracao: number
  autor: string
  imagem: {
    src: string
    alt?: string
  }
  icon?: "robot" | "wood" | "circuit" | "default"
}
