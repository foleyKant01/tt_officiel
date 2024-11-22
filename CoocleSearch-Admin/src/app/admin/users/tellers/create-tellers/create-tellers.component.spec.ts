import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTellersComponent } from './create-tellers.component';

describe('CreateTellersComponent', () => {
  let component: CreateTellersComponent;
  let fixture: ComponentFixture<CreateTellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTellersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
