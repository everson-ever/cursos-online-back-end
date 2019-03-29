'use strict'

const Category = use('App/Models/Category')


class CategoryController {

  async index ({ request, response, view }) {

    const categories = Category.all()

    return categories
  }

  async store ({ auth, request, response }) {

    //const { id } = auth.user

    const data = request.only([
      'name',
      'description'
    ])

    const category = await Category.create({  ...data,  user_id: 1})

    return category;
  }


  async show ({ params, request, response, view }) {

    const category = await Category.findOrFail(params.id)
    await category.load('courses')

    return category
  }

  async update ({ params, request, response }) {
  }


  async destroy ({ params, request, response }) {

    const category = await Category.findOrFail(params.id)

    if (category.user_id !== WebAuthentication.user_id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await category.delete()
  }
}

module.exports = CategoryController
