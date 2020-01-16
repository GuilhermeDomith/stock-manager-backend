import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProdutosComponent } from './page-produtos.component';

describe('PageProdutosComponent', () => {
  let component: PageProdutosComponent;
  let fixture: ComponentFixture<PageProdutosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageProdutosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
