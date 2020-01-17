import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../produto.model';
import { ProdutoService } from '../produto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'page-produtos',
  templateUrl: './page-produtos.component.html',
  styleUrls: ['./page-produtos.component.css']
})
export class PageProdutosComponent{
  simpleReqProdutos :Observable<Produto[]>

  constructor(
    private produtoService : ProdutoService,
    private router:Router){
  }
  
  ngOnInit(){
    this.getSimpleHttpRequest()  
  }

  getSimpleHttpRequest(){
    this.simpleReqProdutos = this.produtoService.getProdutos()
    //this.simpleReqProdutos.subscribe(produtos => produtos)                              s
  }

  toPageEditProduto(produto){
    this.router.navigate(['/editar_produto'], {state: {data: produto}})
    console.log(produto)
  }
}
