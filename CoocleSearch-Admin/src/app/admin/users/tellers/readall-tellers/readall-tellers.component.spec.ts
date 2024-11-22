import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadallTellersComponent } from './readall-tellers.component';

describe('ReadallTellersComponent', () => {
  let component: ReadallTellersComponent;
  let fixture: ComponentFixture<ReadallTellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadallTellersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadallTellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
