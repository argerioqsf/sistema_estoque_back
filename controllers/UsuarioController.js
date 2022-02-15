
function listar(req, res) {
    console.log(req.body);
    return res.json( {message: 'Pessoas listadas' } );
}

function cadastrar(req, res) {
    console.log(req.body);
    return res.json( {message: 'Pessoa criada com sucesso!' } );
}


module.exports = {
    listar:listar,
    cadastrar:cadastrar
}