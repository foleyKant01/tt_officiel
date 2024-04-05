import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TellerComponent } from './teller.component';

describe('TellerComponent', () => {
  let component: TellerComponent;
  let fixture: ComponentFixture<TellerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TellerComponent]
    });
    fixture = TestBed.createComponent(TellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
