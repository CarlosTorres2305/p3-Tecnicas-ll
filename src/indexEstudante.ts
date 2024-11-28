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


const estudantes = [
    { ra: 101010, media: 8.0, pessoaNome: "Marcos da Silva" },
    { ra: 100101, media: 9.5, pessoaNome: "Ana Maria Brega" },
    { ra: 111111, media: 7.0, pessoaNome: "Paulo França" }
];

// Array para armazenar os IDs retornados pelo backend
const estudantesIDs: string[] = [];

estudantes.forEach(estudante => {
    (async () => {
        await fetch('http://localhost:3001/estudante', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ra: estudante.ra,
                media: estudante.media,
                pessoa: estudante.pessoaNome, // Supondo que o backend resolva o nome para o ID correto
            }),
        })
            .then(response => response.json())
            .then(data => {
                estudantesIDs.push(data._id); // Armazena o ID retornado
                console.log(`Estudante cadastrado: RA ${data.ra} (ID: ${data._id})`);
            })
            .catch(error => {
                console.error(`Erro ao cadastrar estudante com RA ${estudante.ra}:`, error);
            });
    })();
});