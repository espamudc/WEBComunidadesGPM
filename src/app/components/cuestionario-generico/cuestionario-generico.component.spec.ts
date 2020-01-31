import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionarioGenericoComponent } from './cuestionario-generico.component';

describe('CuestionarioGenericoComponent', () => {
  let component: CuestionarioGenericoComponent;
  let fixture: ComponentFixture<CuestionarioGenericoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuestionarioGenericoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuestionarioGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
