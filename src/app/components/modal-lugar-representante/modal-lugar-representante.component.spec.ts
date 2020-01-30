import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLugarRepresentanteComponent } from './modal-lugar-representante.component';

describe('ModalLugarRepresentanteComponent', () => {
  let component: ModalLugarRepresentanteComponent;
  let fixture: ComponentFixture<ModalLugarRepresentanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLugarRepresentanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLugarRepresentanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
