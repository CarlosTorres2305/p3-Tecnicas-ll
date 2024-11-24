import { Request, Response } from "express";
import { Disciplina } from "../models";

class DisciplinaController{

    //create

    public async create(req: Request, res: Response): Promise<any> {
        const {descricao, curso, semestre} = req.body;
        try{
            const document = new Disciplina({descricao, curso, semestre });
             // ao salvar serão aplicadas as validações do esquema
             const resp = await document.save();
             return res.json(resp);
        }  catch (error: any) {
            if (error && error.errors["descricao"]) {
                return res.json({ message: error.errors["descricao"].message });
            } else if (error && error.errors["curso"]) {
                return res.json({ message: error.errors["curso"].message });
            } else if (error && error.errors["semestre"]) {
                return res.json({ message: error.errors["semestre"].message }); 
            }
                

            return res.json({ message: error });
        }
    }

    //list

    public async list(_: Request, res: Response): Promise<any> {
        try {
            const objects = await Disciplina.find().sort({ nome: "asc" });
            return res.json(objects);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // delete

    public async delete(req: Request, res: Response): Promise<any> {
        const { id: _id } = req.body; // _id do registro a ser excluído
        try {
            const object = await Disciplina.findByIdAndDelete(_id);
            if (object) {
                return res.json({ message: "Registro excluído com sucesso!" });
            } else {
                return res.json({ message: "Registro inexistente!" });
            }
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // update

    public async update(req: Request, res: Response): Promise<any> {
        const {id, descricao, curso, semestre} = req.body;
        try {
            // busca o autor existente na coleção antes de fazer o update
            const document = await Disciplina.findById(id);
            if (!document) {
                return res.json({ message: "Autor inexistente!" });
            }
            // atualiza os campos
            document.descricao = descricao;
            document.curso = curso;
            document.semestre = semestre;
            // ao salvar serão aplicadas as validações do esquema
            const resp = await document.save();
            return res.json(resp);
        } catch (error: any) {
            if (error.code === 11000 || error.code === 11001) {
                // código 11000 e 11001 indica violação de restrição única (índice duplicado)
                return res.json({ message: "Este e-mail/cpf já está em uso!" });
            } else if (error && error.errors["mail"]) {
                return res.json({ message: error.errors["mail"].message });
            } else if (error && error.errors["nome"]) {
                return res.json({ message: error.errors["nome"].message });
            } else if (error && error.errors["cpf"]) {
                return res.json({ message: error.errors["cpf"].message });
            }else if (error && error.errors["data_nasc"]) {
                return res.json({ message: error.errors["data_nasc"].message });
            }
            return res.json({ message: error.message });
        }
    }
    
}

export default new  DisciplinaController();