const {ApolloServer, gql} = require('apollo-server')
const usuarios = [{
    id: 1,
    nome: 'Joao Silva',
    email: 'jsilva@email.com',
    idade: 29
},{
    id: 2,
    nome: 'Rafael Junior',
    email: 'rafajun@email.com',
    idade: 31
},{
    id: 3,
    nome: 'Ada Lovelace',
    email: 'adalove@email.com',
    idade: 24
}]

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
        usuarios: [Usuario]  
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

        usuarios() {
            return usuarios
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