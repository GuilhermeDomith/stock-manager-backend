import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEditProdutoComponent } from './page-edit-produto.component';

describe('PageEditProdutoComponent', () => {
  let component: PageEditProdutoComponent;
  let fixture: ComponentFixture<PageEditProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageEditProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEditProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
