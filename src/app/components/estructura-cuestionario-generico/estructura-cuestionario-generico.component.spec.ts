import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstructuraCuestionarioGenericoComponent } from './estructura-cuestionario-generico.component';

describe('EstructuraCuestionarioGenericoComponent', () => {
  let component: EstructuraCuestionarioGenericoComponent;
  let fixture: ComponentFixture<EstructuraCuestionarioGenericoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstructuraCuestionarioGenericoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstructuraCuestionarioGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
