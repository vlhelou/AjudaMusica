import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { EnvioLinkComponent } from './envio-link/envio-link.component';
import { RecebimentoComponent } from './recebimento/recebimento.component';
import { DoacaoComponent } from './doacao/doacao.component';
import { AlimentoComponent } from './alimento/alimento.component';
import { TrocaSenhaComponent } from './troca-senha/troca-senha.component';
import { RegistraComponent } from './registra/registra.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PrincipalComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'enviolink', component: EnvioLinkComponent },
  { path: 'recebimento', component: RecebimentoComponent },
  { path: 'doacao', component: DoacaoComponent },
  { path: 'alimento', component: AlimentoComponent },
  { path: 'trocasenha', component: TrocaSenhaComponent },
  { path: 'registra/:id', component: RegistraComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
