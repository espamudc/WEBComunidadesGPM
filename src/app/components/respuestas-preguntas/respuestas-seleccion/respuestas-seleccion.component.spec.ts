import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestasSeleccionComponent } from './respuestas-seleccion.component';

describe('RespuestasSeleccionComponent', () => {
  let component: RespuestasSeleccionComponent;
  let fixture: ComponentFixture<RespuestasSeleccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespuestasSeleccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespuestasSeleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
