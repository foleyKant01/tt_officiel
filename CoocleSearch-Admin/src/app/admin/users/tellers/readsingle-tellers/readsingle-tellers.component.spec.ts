import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadsingleTellersComponent } from './readsingle-tellers.component';

describe('ReadsingleTellersComponent', () => {
  let component: ReadsingleTellersComponent;
  let fixture: ComponentFixture<ReadsingleTellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadsingleTellersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadsingleTellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
