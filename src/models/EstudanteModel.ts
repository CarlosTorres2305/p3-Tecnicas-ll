export default class EstudanteModel {
    id:string = "";
    ra:number;
    media:number;
    pessoa:number;

    constructor(ra:number, media:number, pessoa:number){
        this.ra = ra;
        this.media = media;
        this.pessoa = pessoa;
    }
}