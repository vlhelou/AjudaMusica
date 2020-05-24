import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtInterceptor } from './jwt/jwt.interceptor';
import { ErrorInterceptor } from './jwt/error.interceptor';

import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { UsuarioComponent } from './usuario/usuario.component';
import { EnvioLinkComponent } from './envio-link/envio-link.component';
import { RecebimentoComponent } from './recebimento/recebimento.component';
import { DoacaoComponent } from './doacao/doacao.component';
import { SaldoComponent } from './saldo/saldo.component';
import { AlimentoComponent } from './alimento/alimento.component';
import { PrincipalComponent } from './principal/principal.component';
import { TrocaSenhaComponent } from './troca-senha/troca-senha.component';
import { AlimentoAutocompleteComponent } from './alimento-autocomplete/alimento-autocomplete.component';

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
    TrocaSenhaComponent,
    AlimentoAutocompleteComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,

    DialogModule, TableModule,

    MatInputModule, MatButtonModule, MatAutocompleteModule, MatCheckboxModule
  ],
  schemas: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
