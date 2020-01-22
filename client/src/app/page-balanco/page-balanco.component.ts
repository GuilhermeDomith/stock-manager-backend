import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Produto } from '../produto.model';
import { ProdutoService } from '../produto.service';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'page-balanco',
  templateUrl: './page-balanco.component.html',
  styleUrls: ['./page-balanco.component.css'],
  providers: [DatePipe]
})
export class PageBalancoComponent implements OnInit {

  simpleReqProdutos : Observable<Produto[]>
  columnsTableProdutos : String[] = ["descricao", "quantidade", "quantidade_add", "action"]
  date_format="yyyyMMdd"

  constructor(
    private produtoService : ProdutoService,
    private router : Router,
    private datePipe : DatePipe){ }
  
  ngOnInit(){
    this.simpleReqProdutos = this.produtoService.getProdutos()
  }

  realizarBalanco(produto){
    produto.data_update = this.getDataAtual()
    produto.quantidade_add = produto.quantidade_add || 0

    this.produtoService.realizarBalanco(produto).subscribe((res)=>{
      console.log(res)
    })
  }

  getDataAtual(){
    return this.datePipe.transform(new Date(),this.date_format)
  }

}