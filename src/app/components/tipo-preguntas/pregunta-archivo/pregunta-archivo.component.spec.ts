import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntaArchivoComponent } from './pregunta-archivo.component';

describe('PreguntaArchivoComponent', () => {
  let component: PreguntaArchivoComponent;
  let fixture: ComponentFixture<PreguntaArchivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreguntaArchivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntaArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
