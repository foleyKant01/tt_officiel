import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadsingleBusinessComponent } from './readsingle-business.component';

describe('ReadsingleBusinessComponent', () => {
  let component: ReadsingleBusinessComponent;
  let fixture: ComponentFixture<ReadsingleBusinessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadsingleBusinessComponent]
    });
    fixture = TestBed.createComponent(ReadsingleBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
