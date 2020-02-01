
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSidenavComponent } from './admin-sidenav.component';

describe('AdminSidenavComponent', () => {
  let component: AdminSidenavComponent;
  let fixture: ComponentFixture<AdminSidenavComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSidenavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
