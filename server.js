const express = require("express");

const app = express();

app.use(express.json());

let usuarios = [
    {id: 1, nome: "João", email: "joao@gmail.com"},
    {id: 2, nome: "Maria", email: "maria@gmail.com"},
    {id: 3, nome: "Carlos", email: "carlos@gmail.com"}
];

app.get("/", (req,res) => {
    res.send("Servidor funcionando com sucesso");
});

app.get("/usuarios", (req,res) => {
    res.json(usuarios);
});

app.get("usuarios/:id", (req, res) => {
    const id = Number(req.params.id);

    const usuario = usuarios.find(u => u.id === id);

    if (!usuario){
        return res.status(404).json({
            mensagem: "usuario não encontrado"
        })
    }
    res.json(usuario);
});


app.post("/cadastro", (req,res) => {
    const { nome, email } = req.body;

    if(!nome || !email){
        return res.status(400).json({
            mensagem: "Nome e email são obrigatorios"
        });
    }
    const novoUsuario = {
        id:usuarios.length + 1,
        nome,
        email
    };
    usuarios.push(novoUsuario);

    res.status(201).json({
        mensagem: "Cadastro realizado com sucesso!",
        usuario: novoUsuario
    });
})

app.put("/editar/:id", (req,res) => {
    const id = Number(req.params.id);
    const { nome, email } = req.body;
    const usuario = usuarios.find(u => u.id === id);
    if(!usuario){
        return res.status(404).json({
            mensagem: "Usuario não encontrado"
        })
    }
    res.json({
        mensagem: "Usuario atualizado com sucesso",
        usuario
    })
});

app.delete("/deletar/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = usuarios.findIndex( u => u.id === id);
    if(index === -1){
        return res.status(404).json({
            mensagem: "Usuario não encontrado"
        })
    }

    const usuarioRemovido = usuarios.splice(index, 1);

    res.json({
        mensagem: "Usuario deletado com sucesso!",
        usuario: usuarioRemovido[0]
    })
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})