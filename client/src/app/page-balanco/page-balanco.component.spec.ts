import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBalancoComponent } from './page-balanco.component';

describe('PageBalancoComponent', () => {
  let component: PageBalancoComponent;
  let fixture: ComponentFixture<PageBalancoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageBalancoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBalancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
