import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertissementComponent } from './advertissement.component';

describe('AdvertissementComponent', () => {
  let component: AdvertissementComponent;
  let fixture: ComponentFixture<AdvertissementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvertissementComponent]
    });
    fixture = TestBed.createComponent(AdvertissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
