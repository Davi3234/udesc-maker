import { getCollection } from "astro:content";
import type { Projeto } from "../domain/interfaces/Projeto";

export class ProjetoService {

  async listAll(): Promise<Projeto[]> {
    const projetos = await getCollection('projetos')

    return projetos.map(({ data, filePath }) => {
      const parts = `${filePath}`.split("/")

      parts.pop()
      const slug = parts.pop();

      return {
        ...data,
        slug: slug ?? ''
      }
    })
  }
}
