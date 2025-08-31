import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeV2 } from './home-v2';

describe('HomeV2', () => {
  let component: HomeV2;
  let fixture: ComponentFixture<HomeV2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeV2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeV2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
