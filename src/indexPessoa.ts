import express from "express";
import routes from './routes';
import dotenv from "dotenv";
import connect from "./models/connection";

dotenv.config();

// será usado 3000 se a variável de ambiente não tiver sido definida
const PORT = process.env.PORT || 3000;
const app = express(); // cria o servidor e coloca na variável app

// suportar parâmetros JSON no body da requisição
app.use(express.json());

// conecta ao MongoDB no início da aplicação
connect();

// inicializa o servidor na porta especificada
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});

// define a rota para o pacote /routes
app.use(routes);



const pessoas = [
    { nome: "Marcos da Silva", idade: 21, email: "marcos.silva@fatec.sp.gov.br", fone: "12912343567" },
    { nome: "Ana Maria Brega", idade: 25, email: "ana.brega@fatec.sp.gov.br", fone: "12999979999" },
    { nome: "Paulo França", idade: 18, email: "paulo.fraca@fatec.sp.gov.br", fone: "12999967999" },
    { nome: "Edson Arantes", idade: 30, email: "edson.arantes@gmail.sp.gov.br", fone: "12999957999" }
];

pessoas.forEach(pessoa => {
    (async () => {
        await fetch('http://localhost:3001/pessoa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: pessoa.nome,
                idade: pessoa.idade,
                email: pessoa.email,
                fone: pessoa.fone,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(`Pessoa cadastrada: ${data.nome} (ID: ${data._id})`);
                // O ID retornado pode ser armazenado, se necessário
            })
            .catch(error => {
                console.error(`Erro ao cadastrar pessoa ${pessoa.nome}:`, error);
            });
    })();
});
