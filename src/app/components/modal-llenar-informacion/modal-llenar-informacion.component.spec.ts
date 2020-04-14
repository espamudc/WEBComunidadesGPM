import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLlenarInformacionComponent } from './modal-llenar-informacion.component';

describe('ModalLlenarInformacionComponent', () => {
  let component: ModalLlenarInformacionComponent;
  let fixture: ComponentFixture<ModalLlenarInformacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLlenarInformacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLlenarInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
