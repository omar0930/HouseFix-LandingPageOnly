import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSplit } from './hero-split';

describe('HeroSplit', () => {
  let component: HeroSplit;
  let fixture: ComponentFixture<HeroSplit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSplit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroSplit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
