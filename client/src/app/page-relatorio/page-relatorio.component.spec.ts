import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRelatorioComponent } from './page-relatorio.component';

describe('PageRelatorioComponent', () => {
  let component: PageRelatorioComponent;
  let fixture: ComponentFixture<PageRelatorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageRelatorioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
