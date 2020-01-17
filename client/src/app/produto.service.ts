import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from './produto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  readonly url :string = 'http://localhost:3000'

  constructor(private http : HttpClient) { }

  getProdutos():Observable<Produto[]>{
    return this.http.get<Produto[]>(`${this.url}/produto`)
  }

  setProduto(produto){
    this.http.post(`${this.url}/produto`, produto).subscribe(function(res){
      console.log(res)
    })
  }

}
