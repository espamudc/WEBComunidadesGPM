import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncajonarPreguntaComponent } from './encajonar-pregunta.component';

describe('EncajonarPreguntaComponent', () => {
  let component: EncajonarPreguntaComponent;
  let fixture: ComponentFixture<EncajonarPreguntaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncajonarPreguntaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncajonarPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
