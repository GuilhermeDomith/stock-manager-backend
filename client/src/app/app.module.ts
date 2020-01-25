import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatSidenavModule } from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatListModule} from '@angular/material/list'; 
import {MatRippleModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table'; 
import { PageProdutosComponent } from './page-produtos/page-produtos.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { PageEditProdutoComponent } from './page-edit-produto/page-edit-produto.component'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatCardModule} from '@angular/material/card'; 
import { FormsModule } from '@angular/forms';
import { TitlePageComponent } from './title-page/title-page.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PageBalancoComponent } from './page-balanco/page-balanco.component';
import { PageRelatorioComponent } from './page-relatorio/page-relatorio.component';

const routes:Routes = [
  {path: 'editar_produto', component: PageEditProdutoComponent},
  {path: 'produtos', component: PageProdutosComponent},
  {path: 'balanco', component: PageBalancoComponent},
  {path: 'relatorio', component: PageRelatorioComponent},
  {path: '', pathMatch:'full', redirectTo: 'produtos'}
]

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    PageProdutosComponent,
    PageEditProdutoComponent,
    TitlePageComponent,
    PageBalancoComponent,
    PageRelatorioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatRippleModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
