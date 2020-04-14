import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionarCaracterizacionComponent } from './versionar-caracterizacion.component';

describe('VersionarCaracterizacionComponent', () => {
  let component: VersionarCaracterizacionComponent;
  let fixture: ComponentFixture<VersionarCaracterizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionarCaracterizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionarCaracterizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
