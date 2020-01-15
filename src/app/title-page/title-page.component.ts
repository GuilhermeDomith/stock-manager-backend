import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'title-page',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.css']
})
export class TitlePageComponent implements OnInit {

  @Input() text = "Produtos em Estoque"

  constructor() { }

  ngOnInit() {
  }

}
