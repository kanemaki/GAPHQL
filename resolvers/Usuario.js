const { perfis } = require('../data/db.js')

module.exports = {
    salario(usuario){
        return usuario.salario_real
    },

    perfil(usuario) {
        const selc = perfis
            .filter(p => p.id === usuario.perfil_id)
        return selc ? selc[0] : null    
    }
}