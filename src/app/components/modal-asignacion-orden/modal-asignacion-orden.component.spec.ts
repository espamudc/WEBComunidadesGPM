import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAsignacionOrdenComponent } from './modal-asignacion-orden.component';

describe('ModalAsignacionOrdenComponent', () => {
  let component: ModalAsignacionOrdenComponent;
  let fixture: ComponentFixture<ModalAsignacionOrdenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAsignacionOrdenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAsignacionOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
