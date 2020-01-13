import {Component} from '@angular/core';

/** @title Basic sidenav */
@Component({
  selector: 'sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.css'],
})
export class SidenavComponent {
  showSidenav = true
  pages = [{
    label:'Produtos',
    url:'produtos'
  },{
    label:'Relatório de Produtos',
    url:'relatorio'
  },{
    label:'Balanço Mensal',
    url:'balanco'
  }]
}
