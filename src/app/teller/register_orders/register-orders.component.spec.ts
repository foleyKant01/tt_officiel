import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOrdersComponent } from './register-orders.component';

describe('RegisterOrdersComponent', () => {
  let component: RegisterOrdersComponent;
  let fixture: ComponentFixture<RegisterOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterOrdersComponent]
    });
    fixture = TestBed.createComponent(RegisterOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
