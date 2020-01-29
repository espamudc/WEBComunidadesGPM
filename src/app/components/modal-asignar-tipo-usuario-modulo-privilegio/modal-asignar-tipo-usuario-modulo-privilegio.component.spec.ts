import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAsignarTipoUsuarioModuloPrivilegioComponent } from './modal-asignar-tipo-usuario-modulo-privilegio.component';

describe('ModalAsignarTipoUsuarioModuloPrivilegioComponent', () => {
  let component: ModalAsignarTipoUsuarioModuloPrivilegioComponent;
  let fixture: ComponentFixture<ModalAsignarTipoUsuarioModuloPrivilegioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAsignarTipoUsuarioModuloPrivilegioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAsignarTipoUsuarioModuloPrivilegioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
