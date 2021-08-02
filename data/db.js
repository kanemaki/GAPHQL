const usuarios = [
    { id: 1, nome: 'Joao Silva', email: 'jsilva@email.com', idade: 29, perfil_id: 1, status: 'ATIVO'},
    { id: 2, nome: 'Rafael Junior', email: 'rafajun@email.com', idade: 31, perfil_id: 2, status: 'INATIVO'},
    { id: 3, nome: 'Ada Lovelace', email: 'adalove@email.com', idade: 24, perfil_id: 1, status: 'BLOQUEADO'}
]

const perfis = [
    { id: 1, nome: 'Comum'},
    { id: 2, nome: 'Administrador'}
]

module.exports = { usuarios, perfis }
