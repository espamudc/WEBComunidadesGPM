import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAsignarModuloPrivilegioComponent } from './modal-asignar-modulo-privilegio.component';

describe('ModalAsignarModuloPrivilegioComponent', () => {
  let component: ModalAsignarModuloPrivilegioComponent;
  let fixture: ComponentFixture<ModalAsignarModuloPrivilegioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAsignarModuloPrivilegioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAsignarModuloPrivilegioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
