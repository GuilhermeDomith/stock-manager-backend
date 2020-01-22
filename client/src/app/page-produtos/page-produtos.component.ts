import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
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
  update = new BehaviorSubject<boolean>(false);

  constructor(
    private produtoService : ProdutoService,
    private router:Router){ }
  
  ngOnInit(){
    this.getSimpleHttpRequest()  
    this.update.subscribe(update=>update === true ? this.getSimpleHttpRequest() : '');
  }

  getSimpleHttpRequest(){
    this.simpleReqProdutos = this.produtoService.getProdutos()
  }

  toPageEditProduto(produto){
    this.router.navigate(['/editar_produto'], {state: {data: produto}})
  }

  deleteProduto(produto){
    const simpleDelProduto = this.produtoService.deleteProduto(produto.id)

    simpleDelProduto.subscribe(function(res){
      console.log(res)
      console.log('deleted?', produto)
    })

    this.update.next(true)
  }
}
