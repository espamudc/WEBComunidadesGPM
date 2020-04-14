import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCaracterizacionComponent } from './lista-caracterizacion.component';

describe('ListaCaracterizacionComponent', () => {
  let component: ListaCaracterizacionComponent;
  let fixture: ComponentFixture<ListaCaracterizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaCaracterizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCaracterizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
