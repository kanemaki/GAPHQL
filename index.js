const {ApolloServer, gql} = require('apollo-server')
const typeDefs = gql`
    # Pontos de entrada da minha API!
    type Query {
        ola: String    
    }
`
const resolvers = {
    Query: {
        ola() {
            return 'Retornando uma string de teste'
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
})