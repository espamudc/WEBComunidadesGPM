import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestasMatrizSeleccionComponent } from './respuestas-matriz-seleccion.component';

describe('RespuestasMatrizSeleccionComponent', () => {
  let component: RespuestasMatrizSeleccionComponent;
  let fixture: ComponentFixture<RespuestasMatrizSeleccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespuestasMatrizSeleccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespuestasMatrizSeleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
