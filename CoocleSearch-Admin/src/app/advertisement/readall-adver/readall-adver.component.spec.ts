import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadallAdverComponent } from './readall-adver.component';

describe('ReadallAdverComponent', () => {
  let component: ReadallAdverComponent;
  let fixture: ComponentFixture<ReadallAdverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadallAdverComponent]
    });
    fixture = TestBed.createComponent(ReadallAdverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
