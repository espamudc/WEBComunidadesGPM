import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAsignarRepresentanteModeloPublicadoComponent } from './modal-asignar-representante-modelo-publicado.component';

describe('ModalAsignarRepresentanteModeloPublicadoComponent', () => {
  let component: ModalAsignarRepresentanteModeloPublicadoComponent;
  let fixture: ComponentFixture<ModalAsignarRepresentanteModeloPublicadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAsignarRepresentanteModeloPublicadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAsignarRepresentanteModeloPublicadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
