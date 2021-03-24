import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAsignarEncuestadoComponent } from './modal-asignar-encuestado.component';

describe('ModalAsignarEncuestadoComponent', () => {
  let component: ModalAsignarEncuestadoComponent;
  let fixture: ComponentFixture<ModalAsignarEncuestadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAsignarEncuestadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAsignarEncuestadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
