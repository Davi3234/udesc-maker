import { getCollection, type RenderedContent } from "astro:content";
import type { Projeto } from "../domain/interfaces/Projeto";

export interface ProjetoContent {
  data: Projeto
  body?: RenderedContent
}

export class ProjetoService {

  async listAll(): Promise<Projeto[]> {
    const projetos = await getCollection('projetos')

    const pro = projetos.map(({ data, filePath }) => ({
      ...data,
      slug: this.makeSlugFromPath(filePath)
    }))

    return pro
  }

  async get(slug: string): Promise<ProjetoContent> {
    const projetos = await getCollection('projetos')

    for (let i = 0; i < projetos.length; i++) {
      const projectSlug = this.makeSlugFromPath(projetos[i].filePath)

      if (projectSlug == slug) {
        return {
          data: {
            ...projetos[i].data,
            slug: projectSlug,
          },
          body: projetos[i].rendered
        }
      }
    }

    throw new Error(`Projeto ${slug} não encontrado`)
  }

  private makeSlugFromPath(path?: string) {
    const parts = `${path}`.split("/")

    parts.pop()
    return parts.pop() ?? ''
  }
}
