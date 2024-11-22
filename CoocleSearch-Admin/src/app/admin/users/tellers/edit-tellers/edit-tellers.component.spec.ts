import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTellersComponent } from './edit-tellers.component';

describe('EditTellersComponent', () => {
  let component: EditTellersComponent;
  let fixture: ComponentFixture<EditTellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTellersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
