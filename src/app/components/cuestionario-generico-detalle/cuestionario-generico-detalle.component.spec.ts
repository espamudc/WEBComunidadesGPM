import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionarioGenericoDetalleComponent } from './cuestionario-generico-detalle.component';

describe('CuestionarioGenericoDetalleComponent', () => {
  let component: CuestionarioGenericoDetalleComponent;
  let fixture: ComponentFixture<CuestionarioGenericoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuestionarioGenericoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuestionarioGenericoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
