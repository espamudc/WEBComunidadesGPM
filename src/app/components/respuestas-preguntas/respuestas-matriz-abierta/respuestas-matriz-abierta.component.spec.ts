import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestasMatrizAbiertaComponent } from './respuestas-matriz-abierta.component';

describe('RespuestasMatrizAbiertaComponent', () => {
  let component: RespuestasMatrizAbiertaComponent;
  let fixture: ComponentFixture<RespuestasMatrizAbiertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespuestasMatrizAbiertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespuestasMatrizAbiertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
