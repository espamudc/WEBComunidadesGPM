import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAsignarResponsableCuestionarioGenericoComponent } from './modal-asignar-responsable-cuestionario-generico.component';

describe('ModalAsignarResponsableCuestionarioGenericoComponent', () => {
  let component: ModalAsignarResponsableCuestionarioGenericoComponent;
  let fixture: ComponentFixture<ModalAsignarResponsableCuestionarioGenericoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAsignarResponsableCuestionarioGenericoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAsignarResponsableCuestionarioGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
