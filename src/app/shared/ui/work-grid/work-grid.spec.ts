import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkGrid } from './work-grid';

describe('WorkGrid', () => {
  let component: WorkGrid;
  let fixture: ComponentFixture<WorkGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
