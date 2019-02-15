const requireSchema = require('require-graphql-file')
const schema = requireSchema('./collections_schema')
const { collections_url, join_url } = require('../../request/urls')
const { GET, POST, PUT, DELETE } = require('../../request')

// Resolvers
const resolvers = {

	// Collection Resolvers
	getCollections: async () => {
		return await GET(collections_url, "/collection/")
	},
	getMyCollections: async (args, context, info) => {
		let user_id = context.user.id
		return await GET(collections_url, `/collection/user/${user_id}`)
	},
	getCollectionById: async ({ id }) => {
		return await GET(collections_url, `/collection/${id}`)
	},
	getCollectionsByUserId: async ({ user_id }) => {
		return await GET(collections_url, `/collection/user/${user_id}`)
	},
	getRecipeByName: async ({ user_id, name }) => {
		return await GET(collections_url, `/collection/user/${user_id}/${name}`)
	},
	createCollection: async ({ name }, context, info) => {
		let user_id = context.user.id
		return await POST(collections_url, "/collection/", { name, user_id })
	},
	updateCollection: async ({ id, name }) => {
		let user_id = context.user.id
		return await PUT(collections_url, `/collection/${id}`, { name, user_id })
	},
	deleteCollection: async ({ id }) => {
		return await DELETE(collections_url, `/collection/${id}`)
	},

	// Recipe Resolvers
	getCollectionRecipes: async () => {
		return await GET(collections_url, "/recipe/")
	},
	getCollectionRecipeById: async ({ id }) => {
		return await GET(join_url, `/recipes_collections?collection_id=${id}`)
	},
	addToCollection: async ({ input }) => {
		const i = {
			collection_id: input.collection_id,
			recipe_id: input.recipe_id,
			name: ""
		}
		return await POST(collections_url, "/recipe/", i)
	},
	updateCollectionRecipe: async ({ id, input }) => {
		return await PUT(collections_url, `/recipe/${id}`, input)
	},
	removeFromCollection: async ({ id }) => {
		return await DELETE(collections_url, `/recipe/${id}`)
	}
}

module.exports = { schema, resolvers } // Exportar siempre con estos nombres
