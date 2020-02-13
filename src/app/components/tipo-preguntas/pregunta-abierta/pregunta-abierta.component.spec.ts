import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntaAbiertaComponent } from './pregunta-abierta.component';

describe('PreguntaAbiertaComponent', () => {
  let component: PreguntaAbiertaComponent;
  let fixture: ComponentFixture<PreguntaAbiertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreguntaAbiertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntaAbiertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
