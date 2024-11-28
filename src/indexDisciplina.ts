import express from "express";
import routes from './routes';
import dotenv from "dotenv";
import connect from "./models/connection";

dotenv.config();

// será usado 3000 se a variável de ambiente não tiver sido definida
const PORT = process.env.PORT || 3001;
const app = express();

// suportar parâmetros JSON no body da requisição
app.use(express.json());

// conecta ao MongoDB no início da aplicação
connect();

// inicializa o servidor na porta especificada
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});

app.use(routes)

const disciplinas = [
    { nome: "Técnicas de Programação I", curso: "DSM", semestre: 2 },
    { nome: "Técnicas de Programação II", curso: "DSM", semestre: 3 },
    { nome: "Banco de Dados Não Relacional", curso: "DSM", semestre: 3 },
    { nome: "Programação Web I", curso: "DSM", semestre: 2 },
    { nome: "Programação Web II", curso: "DSM", semestre: 3 }
];

// Array para armazenar os IDs retornados pelo backend
const disciplinasIDs: string[] = [];

disciplinas.forEach(disciplina => {
    (async () => {
        await fetch('http://localhost:3001/disciplina', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: disciplina.nome,
                curso: disciplina.curso,
                semestre: disciplina.semestre,
            }),
        })
            .then(response => response.json())
            .then(data => {
                disciplinasIDs.push(data._id); // Armazena o ID retornado
                console.log(`Disciplina cadastrada: ${data.nome} (ID: ${data._id})`);
            })
            .catch(error => {
                console.error(`Erro ao cadastrar disciplina ${disciplina.nome}:`, error);
            });
    })();
});