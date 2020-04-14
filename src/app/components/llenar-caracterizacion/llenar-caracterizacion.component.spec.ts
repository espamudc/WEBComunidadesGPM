import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlenarCaracterizacionComponent } from './llenar-caracterizacion.component';

describe('LlenarCaracterizacionComponent', () => {
  let component: LlenarCaracterizacionComponent;
  let fixture: ComponentFixture<LlenarCaracterizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlenarCaracterizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlenarCaracterizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
