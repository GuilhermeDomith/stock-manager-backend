import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
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
  //editProduto = new EventEmitter<Produto>();
  date_format="yyyyMMdd"
  produto = {
    id: null,
    descricao: "",
    quantidade: "",
    data_update: null
  }
  title = "Novo Produto"

  constructor(
    private datePipe:DatePipe,
    private produtoService:ProdutoService,
    private router : Router){}

  ngOnInit(){
    this.produto = history.state.data || this.produto
    var date = this.produto.data_update
    if(date == null || date == undefined){
      date = new Date()
    }

    this.produto.data_update = this.datePipe.transform(date,this.date_format)
    this.title = (this.produto.id)? "Alterar Produto" : this.title
  }

  salvar(){
    const simpleEditProduto = this.produtoService.setProduto(this.produto)

    simpleEditProduto.subscribe(function(res){
      console.log('salvar', this.produto)
      console.log(res)
    })

    this.router.navigate(['/produtos'])
  }

}
