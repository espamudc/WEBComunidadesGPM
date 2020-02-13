import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntaMatrizComponent } from './pregunta-matriz.component';

describe('PreguntaMatrizComponent', () => {
  let component: PreguntaMatrizComponent;
  let fixture: ComponentFixture<PreguntaMatrizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreguntaMatrizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntaMatrizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
