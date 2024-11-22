import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TellersComponent } from './tellers.component';

describe('TellersComponent', () => {
  let component: TellersComponent;
  let fixture: ComponentFixture<TellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TellersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
