import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list'; 
import {MatRippleModule} from '@angular/material/core';
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

const routes:Routes = [
  {path: 'editar_produto', component: PageEditProdutoComponent},
  {path: 'produtos', component: PageProdutosComponent},
  {path: '', pathMatch:'full', redirectTo: 'editar_produto'}
]

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    PageProdutosComponent,
    PageEditProdutoComponent,
    TitlePageComponent,
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
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
