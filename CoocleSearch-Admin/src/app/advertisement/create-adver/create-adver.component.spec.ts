import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdverComponent } from './create-adver.component';

describe('CreateAdverComponent', () => {
  let component: CreateAdverComponent;
  let fixture: ComponentFixture<CreateAdverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAdverComponent]
    });
    fixture = TestBed.createComponent(CreateAdverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
