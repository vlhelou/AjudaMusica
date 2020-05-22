import { Saida } from './Saida';
import { Entrada } from './Entrada';
import { Usuario } from './Usuario';
import { Alimento } from './Alimento';

export interface Estoque {
    Id: number;
    IdEntrada?: string;
    IdSaida?: string;
    IdAutor: number;
    Data: Date;
    IdAlimento: number;
    Quantidade: number;

    Saida: Saida;
    Entrada: Entrada;
    Autor: Usuario;
    Alimento: Alimento;
}
