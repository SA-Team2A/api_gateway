const requireSchema = require('require-graphql-file')
const schema = requireSchema('./recipes_schema')
const { recipes_url } = require('../../request/urls')
const { GET, POST, PUT, DELETE } = require('../../request')

const resolvers = {
  getRecipes: async () => {
    let res = await GET(recipes_url, '/recipes')
    return res
  },
  getMyRecipes: async (args, context, info) => {
    let user_id = context.user.id
    let res = await GET(recipes_url, '/recipes/search', { user_id })
    return res
  },
  getDifficulties: async () => {
    let res = await GET(recipes_url, '/difficulties')
    return res
  },
  getRecipeById: async ({ _id }) => {
    let res = await GET(recipes_url, `/recipes/${_id}`)
    return res
  },
  searchRecipes: async ({ search }) => {
    let res = await GET(recipes_url, '/recipes/search', search)
    return res
  },
  createRecipe: async ({ recipe }, context, info) => {
    let user_id = context.user.id
    let body = { ...recipe, user_id }
    console.log(body);
    let res = await POST(recipes_url, '/recipes', body )
    return res
  },
  updateRecipe: async ({ _id, recipe }) => {
    let res = await PUT(recipes_url, `/recipes/${_id}`, recipe)
    return res
  },
  deleteRecipe: async ({ _id }) => {
    let res = await DELETE(recipes_url, `/recipes/${_id}`)
    return res
  }
}

module.exports = { schema, resolvers }
