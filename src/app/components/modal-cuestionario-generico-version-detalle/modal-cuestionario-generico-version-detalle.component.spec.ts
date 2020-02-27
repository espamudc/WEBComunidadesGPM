import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCuestionarioGenericoVersionDetalleComponent } from './modal-cuestionario-generico-version-detalle.component';

describe('ModalCuestionarioGenericoVersionDetalleComponent', () => {
  let component: ModalCuestionarioGenericoVersionDetalleComponent;
  let fixture: ComponentFixture<ModalCuestionarioGenericoVersionDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCuestionarioGenericoVersionDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCuestionarioGenericoVersionDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
