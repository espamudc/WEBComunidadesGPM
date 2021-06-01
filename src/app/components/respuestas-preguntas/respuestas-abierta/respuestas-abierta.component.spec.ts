import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestasAbiertaComponent } from './respuestas-abierta.component';

describe('RespuestasAbiertaComponent', () => {
  let component: RespuestasAbiertaComponent;
  let fixture: ComponentFixture<RespuestasAbiertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespuestasAbiertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespuestasAbiertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
