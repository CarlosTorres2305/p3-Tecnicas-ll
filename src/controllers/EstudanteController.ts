import { Request, Response } from "express";
import { Estudante } from "../models";

class EstudanteController {

    //create 

    public async create(req: Request, res: Response): Promise<any> {
        const { pessoa, ra, media } = req.body;
        try {
            const document = new Estudante({ pessoa, ra, media });
            // ao salvar serão aplicadas as validações do esquema
            const response = await document.save();
            return res.json(response);
        } catch (error: any) {
            if (error.code === 11000 || error.code === 11001) {
                // código 11000 e 11001 indica violação de restrição única (índice duplicado)
                return res.json({ message: "Este RA já está em uso!" });
            } else if (error && error.errors["pessoa"]) {
                return res.json({ message: error.errors["pessoa"].message });
            } else if (error && error.errors["media"]){
                return res.json({ message: error.errors["media"].message });
            }
            return res.json({ message: error });
        }
    }

    // list

    public async list(_: Request, res: Response): Promise<any> {
        try {
            const objects = await Estudante.find()
                .populate("pessoa")
                .populate("ra")
                .select("media")
                .sort({ pessoa: "asc" });
            return res.json(objects);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // delete

    public async delete(req: Request, res: Response): Promise<any> {
        const { id: _id } = req.body; // _id do registro a ser excluído
        try {
            const object = await Estudante.findByIdAndDelete(_id);
            if (object) {
                return res.json({ message: "Registro excluído com sucesso" });
            } else {
                return res.json({ message: "Registro inexistente" });
            }
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // update

    public async update(req: Request, res: Response): Promise<any> {
        const { id, pessoa, ra, media } = req.body;
        try {
            // busca o registro existente na coleção antes de fazer o update
            const document = await Estudante.findById(id);
            if (!document) {
                return res.json({ message: "Registro inexistente!" });
            }
            // atualiza os campos
            document.pessoa = pessoa;
            document.ra = ra;
            document.media = media;
            // ao salvar serão aplicadas as validações do esquema
            const response = await document.save();
            return res.json(response);
        } catch (error: any) {
            if (error.code === 11000 || error.code === 11001) {
                // código 11000 e 11001 indica violação de restrição única (índice duplicado)
                return res.json({ message: "Este RA já está em uso!" });
            } else if (error && error.errors["pessoa"]) {
                return res.json({ message: error.errors["pessoa"].message });
            } else if (error && error.errors["media"]){
                return res.json({ message: error.errors["media"].message });
            }
            return res.json({ message: error });
        }

    }
}    

export default new EstudanteController();