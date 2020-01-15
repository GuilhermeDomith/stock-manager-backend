import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-edit-produto',
  templateUrl: './page-edit-produto.component.html',
  styleUrls: ['./page-edit-produto.component.css']
})
export class PageEditProdutoComponent {
  produto = {
    descricao: "Embalagem para Bolos 500gr",
    quantidade: 100
  }
}
