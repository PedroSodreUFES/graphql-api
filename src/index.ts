import 'reflect-metadata'
import "dotenv/config"
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@as-integrations/express5"
import express from "express"
import { buildSchema } from "type-graphql"
import { AuthResolver } from "./resolvers/auth.resolver.js"
import { UserResolver } from "./resolvers/user.resolver.js"

async function bootstrap() {
  const app = express()

  const schema = await buildSchema({
    resolvers: [AuthResolver, UserResolver],
    validate: false,
    emitSchemaFile: './schema.graphql',
  })

  const server = new ApolloServer({
    schema,
  })

  await server.start()

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server)
  )

  app.listen({
    port: 4000,
  }, () => {
    console.log(`Servidor rodando na porta 4000!`)
  })
}

bootstrap()