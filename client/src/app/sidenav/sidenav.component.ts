import {Component} from '@angular/core';

/** @title Basic sidenav */
@Component({
  selector: 'sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.css'],
})
export class SidenavComponent {
  pages = [{
    label:'Produtos',
    path:'produtos'
  },{
    label:'Relatório de Produtos',
    path:'relatorio'
  },{
    label:'Balanço Mensal',
    path:'balanco'
  }]
}
