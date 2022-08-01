import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "./hero-detail.component";
import { Location } from '@angular/common';
import { of } from "rxjs/internal/observable/of";
import { FormsModule } from "@angular/forms";

describe('HeroDetailComponent', () => {
  // 6.7 - createComponent in h2 tag test returns a ComponentFixture w/ subtype of
  // actual component contained within it.
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockActivatedRoute, mockHeroService, mockLocation;

  beforeEach(() => {
    // See video @ 4:30 for explanation***
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => { return '3'; }}}
    }
    // Mock heroService's 2 methods: getHero(), updateHero()
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    // Since we only use back() in hero-detail.component, we just mock that function:
    mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      // 6.7 - import FormsModule to allow h2 test below to access ngModel in the HTML file
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: HeroService, useValue: mockHeroService},
        {provide: Location, useValue: mockLocation}
      ]
    });

    fixture = TestBed.createComponent(HeroDetailComponent);

    // This returns the actual data going into Hero property from ln 28 in hero-detail.component.ts
    mockHeroService.getHero.and.returnValue(of({id: 420, name: 'SuperDude', strength: 69}));
  })

  // Unit Tests 6.7: new test: check that hero name is rendered correctly
  // Hero property in hero-detail is rendered into an h2 tag in the template: hero-detail.component.html, ln 2
  it('should render hero name in an h2 tag', () => {
    // Act
    fixture.detectChanges();

    // Assert
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
  });

  // 7.3: Adding new test. returnValue() returns an empty object because we ignore the return value
  // in hero-detail.component.ts save(), where subscribe() returns nothing.
  // 'done' param just below tells Jasmine that it's an async test
  it('should call updateHero when save() is called', (done) => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.save();

    setTimeout(() => {
      expect(mockHeroService.updateHero).toHaveBeenCalled();
      done();
    }, 300);
  })
})

// PS Unit Tests 6.6 - Testing w/ActivatedRoute
// PS Unit Tests 6.7 - Dealing w/ ngModel
// PS Unit Tests 7.3 - Basic Async Testing
