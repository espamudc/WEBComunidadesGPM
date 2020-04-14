import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVistapreviaCaracterizacionComponent } from './modal-vistaprevia-caracterizacion.component';

describe('ModalVistapreviaCaracterizacionComponent', () => {
  let component: ModalVistapreviaCaracterizacionComponent;
  let fixture: ComponentFixture<ModalVistapreviaCaracterizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVistapreviaCaracterizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVistapreviaCaracterizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
