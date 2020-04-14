import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVersionarCaracterizacionComponent } from './modal-versionar-caracterizacion.component';

describe('ModalVersionarCaracterizacionComponent', () => {
  let component: ModalVersionarCaracterizacionComponent;
  let fixture: ComponentFixture<ModalVersionarCaracterizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVersionarCaracterizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVersionarCaracterizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
