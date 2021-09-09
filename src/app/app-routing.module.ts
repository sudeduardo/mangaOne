import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TitulosComponent} from "./titulos/titulos.component";
import {CategoriasComponent} from "./categorias/categorias.component";
import {ClassificacaoComponent} from "./classificacao/classificacao.component";
import {TituloComponent} from "./titulo/titulo.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TitulosComponent
  },
  {
    path: 'categoria/:path',
    component: CategoriasComponent,
    data: {
      breadcrumb: [
        {
          label: 'Categorias',
          url: '/'
        },
        {
          label: '{{name}}',
          url: ''
        },
      ]
    },
  },
  {
    path: 'categoria/:path/:slug',
    component: TituloComponent,
    data: {
      breadcrumb: [
        {
          label: 'Categorias',
          url: '/'
        },
        {
          label: '{{item_name}}',
          url: '/categorias/:path'
        },
        {
          label: '{{manga_name}}',
          url: ''
        },
      ]
    },
  },
  {
    path: 'classificao/:path',
    component: ClassificacaoComponent,
    data: {
      breadcrumb: [
        {
          label: 'Classificação',
          url: '/'
        },
        {
          label: '{{name}}',
          url: ''
        },
      ]
    },
  },
  {
    path: 'classificao/:path/:slug',
    component: TituloComponent,
    data: {
      breadcrumb: [
        {
          label: 'Categorias',
          url: '/'
        },
        {
          label: '{{item_name}}',
          url: '/classificao/:path'
        },
        {
          label: '{{manga_name}}',
          url: '/categorias/:slug'
        },
      ]
    },
  },
  {
    path: 'titulo/:path',
    component: TituloComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
