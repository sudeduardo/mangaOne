import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Ng7DynamicBreadcrumbModule} from "ng7-dynamic-breadcrumb";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {TitulosComponent} from "./titulos/titulos.component";
import {CategoriasComponent} from "./categorias/categorias.component";
import { ClassificacaoComponent } from './classificacao/classificacao.component';
import { TituloComponent } from './titulo/titulo.component';

@NgModule({
  declarations: [
    AppComponent,
    TitulosComponent,
    CategoriasComponent,
    ClassificacaoComponent,
    TituloComponent
  ],
  imports: [
    Ng7DynamicBreadcrumbModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
