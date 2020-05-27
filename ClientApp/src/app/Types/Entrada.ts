import { Usuario } from './Usuario';


export interface Entrada {
    Id: string;
    IdAutor: number;
    IdDoador?: number;
    IdComerciante?: number;
    DataRegistro: Date;
    ConteudoTipo: string;
    Conteudo: any;

    Autor: Usuario;
    Doador: Usuario;
    Comerciante: Usuario;

}
