import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrouveztoutComponent } from './trouveztout.component';

describe('TrouveztoutComponent', () => {
  let component: TrouveztoutComponent;
  let fixture: ComponentFixture<TrouveztoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrouveztoutComponent]
    });
    fixture = TestBed.createComponent(TrouveztoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
