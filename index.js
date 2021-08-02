const {ApolloServer, gql} = require('apollo-server')
const typeDefs = gql`
    scalar Date

    type Usuario {
        id: ID
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
    }

    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }

    # Pontos de entrada da minha API!
    type Query {
        ola: String!
        horaAtual: Date!
        usuarioLogado: Usuario
        produtoEmDestaque: Produto
        numerosMegaSena: [Int!]!    
    }
`
const resolvers = {
    Usuario: {
        salario(usuario){
            return usuario.salario_real
        }
    },
    
    Produto: {
        precoComDesconto(produto){
            if(produto.desconto){
                return produto.preco * (1 - produto.desconto)
            } else {
                return produto.preco
            }
        }
    },
    
    Query: {
        ola() {
            return 'Retornando uma string de teste'
        },

        horaAtual() {
            return new Date()
        },

        usuarioLogado() {
            return {
                id: 1,
                nome:  'kanemaki',
                email: 'kanemaki@kanemaki.com',
                idade: 41,
                salario_real: 1234.56,
                vip: true

            }
        },
        
        produtoEmDestaque() {
            return {
                nome: 'PlayStation 5',
                preco: 499.99,
                desconto: 0.10
            }
        },

        numerosMegaSena() {
            //return [4, 8, 13, 27, 33, 54]
            const crescente = (a, b) => a - b
            return Array(6).fill(0)
                .map(n => parseInt(Math.random() * 60 + 1))
                .sort(crescente) 
        },

    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
})