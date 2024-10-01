const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const jwt = require('jsonwebtoken')
const User = require('./models/user')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const { GraphQLError } = require('graphql')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB', error.message)
  })


const server = new ApolloServer({ typeDefs, resolvers })

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.startsWith('Bearer ')) {
      try {
        const decodedToken = jwt.verify(
          auth.substring(7), process.env.JWT_SECRET
        )

        const currentUser = await User
          .findById(decodedToken.id)

        return { currentUser }
      } catch (error) {
        return {
          authError: new GraphQLError('Token validation error', {
            extensions: {
              code: 'BAD_USER_INPUT',
              http: { status: 401 }
            }
          })
        }
      }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})