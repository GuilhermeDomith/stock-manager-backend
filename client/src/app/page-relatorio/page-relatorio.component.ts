import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../produto.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Produto } from '../produto.model';

@Component({
  selector: 'app-page-relatorio',
  templateUrl: './page-relatorio.component.html',
  styleUrls: ['./page-relatorio.component.css']
})
export class PageRelatorioComponent implements OnInit {

  simpleReqProdutos :Observable<Produto[]>
  update = new BehaviorSubject<boolean>(false);

  produtos : Produto[]

  constructor(
    private produtoService : ProdutoService,
    private router:Router){ }
  
  ngOnInit(){
    this.getSimpleHttpRequest()  
    this.update.subscribe(update=>update === true ? this.getSimpleHttpRequest() : '');
  }

  getSimpleHttpRequest(){
    this.simpleReqProdutos = this.produtoService.getProdutos()
    this.simpleReqProdutos.subscribe((produtos) => {
      this.produtos = produtos
      this.sortByDataTermino()
    })
  }

  sortByDataTermino(){
    this.produtos.sort((a, b) => a.data_termino.localeCompare(b.data_termino));
  }

}

