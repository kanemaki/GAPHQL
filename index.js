const { ApolloServer, gql } = require('apollo-server')
const { importSchema } = require('graphql-import')
const usuarios = [{
    id: 1,
    nome: 'Joao Silva',
    email: 'jsilva@email.com',
    idade: 29,
    perfil_id: 1
},{
    id: 2,
    nome: 'Rafael Junior',
    email: 'rafajun@email.com',
    idade: 31,
    perfil_id: 2
},{
    id: 3,
    nome: 'Ada Lovelace',
    email: 'adalove@email.com',
    idade: 24,
    perfil_id: 1
}]

const perfis = [
    { id: 1, nome: 'Comum'},
    { id: 2, nome: 'Administrador'}
]

const resolvers = {
    Usuario: {
        salario(usuario){
            return usuario.salario_real
        },

        perfil(usuario) {
            const selc = perfis
                .filter(p => p.id === usuario.perfil_id)
            return selc ? selc[0] : null    
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

        usuario(_, args) {
            const selecionados = usuarios
                .filter(u => u.id == args.id)
            return selecionados ? selecionados[0] : null    
        },

        perfis() {
            return perfis
        },

        perfil(_, {id}) {
            const selec = perfis
                .filter(p => p.id == id)
            return selec ? selec[0] : null    
        },

    }
}

const server = new ApolloServer({
    typeDefs: importSchema('./schema/index.graphql'),
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
})