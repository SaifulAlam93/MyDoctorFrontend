import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTableDataComponent } from './custom-table-data.component';

describe('CustomTableDataComponent', () => {
  let component: CustomTableDataComponent;
  let fixture: ComponentFixture<CustomTableDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomTableDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomTableDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
