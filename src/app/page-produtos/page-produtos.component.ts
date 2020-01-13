import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-produtos',
  templateUrl: './page-produtos.component.html',
  styleUrls: ['./page-produtos.component.css']
})
export class PageProdutosComponent{
  produtos = [{
    descricao: 'Embalagem para Bolos 400gr',
    termino: '30 de Jan de 2020',
    quantidade: 1000
  },
  {
    descricao: 'Embalagem para Pães de Forma 500gr',
    termino: '30 de Abr de 2020',
    quantidade: 2000
  }]
}
