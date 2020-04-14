import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarCaracterizacionComponent } from './publicar-caracterizacion.component';

describe('PublicarCaracterizacionComponent', () => {
  let component: PublicarCaracterizacionComponent;
  let fixture: ComponentFixture<PublicarCaracterizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicarCaracterizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicarCaracterizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
