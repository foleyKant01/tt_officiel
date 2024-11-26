import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadallBusinessComponent } from './readall-business.component';

describe('ReadallBusinessComponent', () => {
  let component: ReadallBusinessComponent;
  let fixture: ComponentFixture<ReadallBusinessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadallBusinessComponent]
    });
    fixture = TestBed.createComponent(ReadallBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
