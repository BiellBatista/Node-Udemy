'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
const Category = use('App/Models/Category');

/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  /**
   * Show a list of all categories.
   * GET categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Object} ctx.pagination
   */
  async index({ request, response, pagination }) {
    // pegando os dados na URL da requisição
    // const page = request.input('page');
    // const limit = request.input('limit');
    // const categories = await Category.query().paginate(page, limit);

    const title = request.input('title');

    const query = Category.query();

    if (title) {
      query.where('title', 'LIKE', `%${title}%`);
    }

    // const categories = await Category.query().paginate(
    const categories = await query.paginate(pagination.page, pagination.limit);

    return response.send(categories);
  }

  /**
   * Create/save a new category.
   * POST categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      // pegando todos os valores da variavel request
      const { title, description, image_id } = request.all();
      const category = await Category.create({ title, description, image_id });

      return response.status(201).send(category);
    } catch (error) {
      return response.status(400).send({
        message: 'Erro a processar a sua solicitação'
      });
    }
  }

  /**
   * Display a single category.
   * GET categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ params: { id }, request, response }) {
    // estou desmontando o objeto na entrada dos argumentos
    // const category = await Category.findOrFail(params.id);
    const category = await Category.findOrFail(id);

    return response.send(category);
  }

  /**
   * Update category details.
   * PUT or PATCH categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response }) {
    const category = await Category.findOrFail(id);
    const { title, description, image_id } = request.all();
    category.merge({ title, description, image_id });

    await category.save();

    return response.send(category);
  }

  /**
   * Delete a category with id.
   * DELETE categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const category = await Category.findOrFail(id);

    await category.delete();

    return response.status(204).send();
  }
}

module.exports = CategoryController;
