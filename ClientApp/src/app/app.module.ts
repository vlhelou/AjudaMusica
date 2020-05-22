import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuarioComponent } from './usuario/usuario.component';
import { EnvioLinkComponent } from './envio-link/envio-link.component';
import { RecebimentoComponent } from './recebimento/recebimento.component';
import { DoacaoComponent } from './doacao/doacao.component';
import { SaldoComponent } from './saldo/saldo.component';
import { AlimentoComponent } from './alimento/alimento.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    EnvioLinkComponent,
    RecebimentoComponent,
    DoacaoComponent,
    SaldoComponent,
    AlimentoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
