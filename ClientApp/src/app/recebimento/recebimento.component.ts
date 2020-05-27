import { Component, OnInit } from '@angular/core';
import { EntradaService } from '../Services/entrada.service';
import { Entrada } from '../Types/Entrada';

@Component({
  selector: 'app-recebimento',
  templateUrl: './recebimento.component.html',
  styleUrls: ['./recebimento.component.scss']
})
export class RecebimentoComponent implements OnInit {
  Selecionado: Entrada;
  Lista: Entrada[];
  constructor(private ent: EntradaService) { }

  ngOnInit(): void {
    this.ent.NaoRecebidos().then(p => this.Lista = p);
  }

  PathDownload(id: string): string{
    return this.ent.PathDownload(id);
  }

}
