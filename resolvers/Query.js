const {usuarios, perfis } = require('../data/db.js')

module.exports = {
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