import { Router, Request, Response, NextFunction } from "express";
import estudante from './Estudante';
import pessoa from './Pessoa';
import disciplina from './Disciplina';


const routes = Router();
routes.use("/estudante", estudante);
routes.use("/pessoa", pessoa);
routes.use("/disciplina", disciplina);


// Middleware para capturar requisições desconhecidas
routes.use((_: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ error: "Requisição desconhecida" });
});

export default routes;