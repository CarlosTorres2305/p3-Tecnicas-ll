import mongoose from "mongoose";
const { Schema } = mongoose;

const PessoaSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    nome: {
        type: String,
        maxlength: [50, "O nome pode ter no máximo 50 caracteres"],
        required: [true, "O nome é obrigatório"],
        validate: {
            validator: function (value:string) {
                return value != null && value.trim().length > 0;
            },
            message: "O nome não pode ser nulo",
        },
    },
    idade: {
        type: Number,
        min: [14, "A idade mínima é 14 anos"],
        maxlength: [3, "A idade pode ter no máximo 3 caracteres"],
        required: [true, "A idade é obrigatória"],
    },
    email: {
        type: String,
        maxlength: [100, "O email pode ter no máximo 100 caracteres"],
        required: [true, "O email é obrigatório"],
        unique: true, // Garantindo unicidade no banco
        validate: {
            validator: async function (value:string) {
                // Regex básico para verificar formato de email
                return /^\S+@\S+\.\S+$/.test(value);
            },
            message: "Formato de email inválido",
        },
    },
    fone: {
        type: String,
        maxlength: [11, "O telefone pode ter no máximo 11 caracteres"],
        required: [true, "O telefone é obrigatório"],
        validate: {
            validator: async function (value:string) {
                return value != null && value.trim().length > 0;
            },
            message: "O telefone não pode ser nulo",
        },
    },
});

const DisciplinaSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        auto: true, // Gera automaticamente o ObjectId
    },
    descricao: {
        type: String,
        maxlength: [60, "A descrição pode ter no máximo 60 caracteres"],
        required: [true, "A descrição é obrigatória"],
        validate: {
            validator: function (value:string) {
                return value != null && value.trim().length > 0;
            },
            message: "A descrição não pode ser nula",
        },
    },
    curso: {
        type: String,
        maxlength: [45, "O curso pode ter no máximo 45 caracteres"],
        required: [true, "O curso é obrigatório"],
        validate: {
            validator: function (value:string) {
                return value != null && value.trim().length > 0;
            },
            message: "O curso não pode ser nulo",
        },
    },
    semestre: {
        type: Number,
        min: [1, "O semestre deve ser no mínimo 1"],
        max: [10, "O semestre deve ser no máximo 10"],
        required: [true, "O semestre é obrigatório"],
        validate: {
            validator: Number.isInteger,
            message: "O semestre deve ser um número inteiro",
        },
    },
});


const EstudanteSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        auto: true, // Gera automaticamente o ObjectId
    },
    pessoa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pessoa',
        required: [true, "A pessoa é obrigatória"],
        validate: {
            validator: function (value:string) {
                return value != null;
            },
            message: "A pessoa não pode ser nula",
        },
    },
    ra: {
        type: Number,
        maxlength: [10, "O RA pode ter no máximo 10 caracteres"],
        required: [true, "O RA é obrigatório"],
        unique: true, // Garante que o RA seja único no banco
    },
    media: {
        type: Number,
        min: [0, "A média mínima é 0"],
        max: [10, "A média máxima é 10"],
        validate: {
            validator: function (value:Number) {
                // Verifica se o valor é um número real (float ou inteiro)
                return value === null || (typeof value === 'number' && !isNaN(value));
            },
            message: "A média deve ser um número entre 0 e 10",
        },
    },
});

const Pessoa = mongoose.model("Pessoa", PessoaSchema);
const Disciplina = mongoose.model("Disciplina", DisciplinaSchema);
const Estudante = mongoose.model("Estudante", EstudanteSchema);

export {Pessoa, Disciplina, Estudante};


