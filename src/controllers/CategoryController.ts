import { Request, Response } from "express";
import categoriesModel from "../models/Category";
import postsModel from "../models/Post";

const Category = categoriesModel;
const Post = postsModel;

export default {
  // GET
  async readAllCategories(request: Request, response: Response) {
    const categoryList = await Category.find().sort({ date: "desc" });

    return response.json(categoryList);
  },

  // GET
  async readPostsByCategory(request: Request, response: Response) {
    const categoryList = await Category.findOne({
      slug: request.params.slug,
    })
      .then((category) => {
        if (category) {
          return Post.find({ category: category._id });
        }
      })
      .catch((err: Error) => response.json(err));

    if (categoryList) return response.json(categoryList);

    return response.status(400).json({
      error: "Houve um erro interno ao carregar a lista de categorias",
    });
  },

  // GET
  async readCategoryBySlug(request: Request, response: Response) {
    const category = await Category.findOne({ slug: request.params.slug });

    if (category) return response.json(category);

    return response.status(400).json({
      error: "Houve um erro interno ao carregar a categoria",
    });
  },

  async readCategoryById(request: Request, response: Response) {
    try {
      const category = await Category.findOne({ _id: request.params.id });
      if (category) {
        return response.json(category);
      } else {
        return response.status(404).json({
          error: "Categoria não encontrada",
        });
      }
    } catch (error) {
      console.error(`Erro ao buscar categoria: ${error}`);
      return response.status(500).json({
        error: "Houve um erro interno ao carregar a categoria",
      });
    }
  },

  // POST
  async createCategory(request: Request, response: Response) {
    const { name, slug } = request.body;

    // TODO -  REFORMULAR PARA UMA VALIDAÇÃO DE FORMULÁRIO REUTILIZÁVEL
    if (!name || !slug)
      return response
        .status(400)
        .json({ error: "É necessário preencher um Nome e um Slug" });

    if (name.length < 2) {
      return response
        .status(400)
        .json({ error: "Nome da Categoria deve ser maior" });
    }

    const categoryCreated = await Category.create({
      name,
      slug,
    });

    if (categoryCreated)
      return response
        .status(200)
        .json({ message: "Categoria criada com sucesso!", categoryCreated });

    return response
      .status(401)
      .json({ error: " Houve um erro ao salvar a categoria!" });
  },

  // PUT
  async updateCategory(request: Request, response: Response) {
    const { id } = request.params;
    const { name, slug } = request.body;

    // ADICIONAR VALIDAÇÃO DE FORMULÁRIO

    const categoryUpdated = await Category.findOneAndUpdate(
      { _id: id },
      {
        name,
        slug,
      }
    );

    if (categoryUpdated) return response.json(categoryUpdated);

    return response
      .status(401)
      .json({ error: "Não foi encontrada a categoria para atualizar!" });
  },

  // DELETE
  async deleteCategory(request: Request, response: Response) {
    const { id } = request.params;

    const categoryDeleted = await Category.findOneAndDelete({ _id: id });

    if (categoryDeleted) return response.json(categoryDeleted);

    return response
      .status(401)
      .json({ error: "Não foi encontrada a categoria para deletar!" });
  },
};
