import { Usuario } from './Usuario';

export interface Saida {
    Id: string;
    IdAutor: number;
    IdComerciante: number;
    IdDestinatario: number;
    Data: Date;

    Autor: Usuario;
    Comerciante: Usuario;
    Destinatario: Usuario;
}
