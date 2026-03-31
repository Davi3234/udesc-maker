export type ProjetoLevel = "iniciante" | "intermediário" | "avançado"

export interface Projeto {
  slug: string
  titulo: string
  descricao: string
  level: ProjetoLevel
  imagem: {
    src: string
    alt?: string
  }
  icon?: "robot" | "wood" | "circuit" | "default"
}
