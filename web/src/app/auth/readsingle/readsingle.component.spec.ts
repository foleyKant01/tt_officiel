import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadsingleComponent } from './readsingle.component';

describe('ReadsingleComponent', () => {
  let component: ReadsingleComponent;
  let fixture: ComponentFixture<ReadsingleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadsingleComponent]
    });
    fixture = TestBed.createComponent(ReadsingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
