import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionarioGenericoVersionesComponent } from './cuestionario-generico-versiones.component';

describe('CuestionarioGenericoVersionesComponent', () => {
  let component: CuestionarioGenericoVersionesComponent;
  let fixture: ComponentFixture<CuestionarioGenericoVersionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuestionarioGenericoVersionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuestionarioGenericoVersionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
