import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionarioGenericoPublicarComponent } from './cuestionario-generico-publicar.component';

describe('CuestionarioGenericoPublicarComponent', () => {
  let component: CuestionarioGenericoPublicarComponent;
  let fixture: ComponentFixture<CuestionarioGenericoPublicarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuestionarioGenericoPublicarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuestionarioGenericoPublicarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
