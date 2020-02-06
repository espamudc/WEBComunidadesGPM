import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntaSeleccionComponent } from './pregunta-seleccion.component';

describe('PreguntaSeleccionComponent', () => {
  let component: PreguntaSeleccionComponent;
  let fixture: ComponentFixture<PreguntaSeleccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreguntaSeleccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntaSeleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
