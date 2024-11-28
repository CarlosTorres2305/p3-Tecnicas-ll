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


// Função de máscara para telefone
function phoneMask(v: string | undefined): string | undefined {
    if (v == undefined) {
        return;
    }
    let r = v.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    r = r.replace(/^0/, ""); // Remove zeros à esquerda

    if (r.length >= 11) {
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 7) {
        r = r.replace(/^(\d\d)(\d{5})(\d{0,5}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
        r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else if (v.trim() !== "") {
        r = r.replace(/^(\d*)/, "($1");
    }
    return r;
}

// Listagem de estudantes e seus relacionamentos
async function listarEstudantes() {
    try {
        const estudantesResponse = await fetch('http://localhost:3001/estudante');
        const estudantes = await estudantesResponse.json();

        for (const estudante of estudantes) {
            const pessoaResponse = await fetch(`http://localhost:3001/pessoa/${estudante.pessoa}`);
            const pessoa = await pessoaResponse.json();

            console.log("<< Estudante >>");
            console.log(`RA: ${estudante.ra}`);
            console.log(`Nome: ${pessoa.nome}`);
            console.log(`Idade: ${pessoa.idade}`);
            console.log(`e-Mail: ${pessoa.email}`);
            console.log(`Telefone: ${phoneMask(pessoa.fone)}`);
            console.log(`Média: ${estudante.media.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}`);
            console.log(); // Linha em branco para separar estudantes
        }
    } catch (error) {
        console.error("Erro ao listar estudantes:", error);
    }
}

// Chama a função de listagem
listarEstudantes();