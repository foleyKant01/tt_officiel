import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadsingleCategoriesComponent } from './readsingle-categories.component';

describe('ReadsingleCategoriesComponent', () => {
  let component: ReadsingleCategoriesComponent;
  let fixture: ComponentFixture<ReadsingleCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadsingleCategoriesComponent]
    });
    fixture = TestBed.createComponent(ReadsingleCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
