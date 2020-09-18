import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEncajonamientoComponent } from './modal-encajonamiento.component';

describe('ModalEncajonamientoComponent', () => {
  let component: ModalEncajonamientoComponent;
  let fixture: ComponentFixture<ModalEncajonamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEncajonamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEncajonamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
