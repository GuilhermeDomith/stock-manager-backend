import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { formatDate, DatePipe } from '@angular/common';
import { ProdutoService } from '../produto.service';
import { Produto } from '../produto.model';
import { Router } from '@angular/router';

@Component({
  selector: 'page-edit-produto',
  templateUrl: './page-edit-produto.component.html',
  styleUrls: ['./page-edit-produto.component.css'],
  providers: [DatePipe]
})
export class PageEditProdutoComponent {
  editProduto = new EventEmitter<Produto>();
  produto = {
    descricao: "",
    quantidade: "",
    data_update: null
  }

  constructor(
    private datePipe:DatePipe,
    private router:Router,
    private produtoService:ProdutoService){}

  ngOnInit(){
    this.produto = history.state.data || this.produto
    var date = this.produto.data_update
    if(date == null || date == undefined){
      date = new Date()
    }

    this.produto.data_update = this.datePipe.transform(date,"yyyyMMdd")
  }

  salvar(){
    this.produtoService.setProduto(this.produto)
    console.log('salvar', this.produto)
  }

}
