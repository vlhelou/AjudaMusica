import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { DialogModule } from 'primeng/dialog';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


import { UsuarioComponent } from './usuario/usuario.component';
import { EnvioLinkComponent } from './envio-link/envio-link.component';
import { RecebimentoComponent } from './recebimento/recebimento.component';
import { DoacaoComponent } from './doacao/doacao.component';
import { SaldoComponent } from './saldo/saldo.component';
import { AlimentoComponent } from './alimento/alimento.component';
import { PrincipalComponent } from './principal/principal.component';
import { TrocaSenhaComponent } from './troca-senha/troca-senha.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    EnvioLinkComponent,
    RecebimentoComponent,
    DoacaoComponent,
    SaldoComponent,
    AlimentoComponent,
    PrincipalComponent,
    TrocaSenhaComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DialogModule,

    MatInputModule, MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
