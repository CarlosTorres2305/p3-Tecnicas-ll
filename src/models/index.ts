import mongoose from "mongoose";
const { Schema } = mongoose;


const ddds = [
    11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42,
    43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74,
    75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99
  ];

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
        validator: function (value: string) {
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
      unique: true,
      validate: {
        validator: async function (value: string) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const domainRegex = /@(etec|fatec|cps)\.sp\.gov\.br$/;
          return emailRegex.test(value) && domainRegex.test(value);
        },
        message:
          "O email deve estar no formato correto e pertencer ao domínio @etec, @fatec ou @cps com o sufixo .sp.gov.br",
      },
    },
    fone: {
      type: String,
      maxlength: [11, "O telefone pode ter no máximo 11 caracteres"],
      required: [true, "O telefone é obrigatório"],
      validate: {
        validator: async function (value: string) {
          const phoneRegex = /^[0-9]{10,11}$/;
          if (!phoneRegex.test(value)) return false;
  
          const ddd = parseInt(value.substring(0, 2));
          return ddds.includes(ddd);
        },
        message:
          "O telefone deve conter de 10 a 11 dígitos numéricos e o DDD deve ser válido",
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
        validator: async function (value: string) {
          // Verifica se o ID existe na coleção Pessoa
          const pessoa = await mongoose.model('Pessoa').findById(value);
          return !!pessoa; // Retorna verdadeiro se a pessoa for encontrada
        },
        message: "A pessoa referenciada não existe no banco de dados",
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
        validator: function (value: number) {
          // Verifica se o valor é um número válido entre 0 e 10
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


