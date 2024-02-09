import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadallCategoriesComponent } from './readall-categories.component';

describe('ReadallCategoriesComponent', () => {
  let component: ReadallCategoriesComponent;
  let fixture: ComponentFixture<ReadallCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadallCategoriesComponent]
    });
    fixture = TestBed.createComponent(ReadallCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
