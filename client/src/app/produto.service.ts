import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
    const url = `${this.url}/produto`
    return this.http.post(url, produto)
  }

  deleteProduto(id) : Observable<void>{
    const url = `${this.url}/produto`
    return this.http.request<void>('delete', url, {body: {id}})
  }

  realizarBalanco(produto){
    const url = `${this.url}/balanco`
    return this.http.post(url, produto)
  }

  private handleError(errorResponse : HttpErrorResponse){
    console.log(errorResponse)
  }

}
