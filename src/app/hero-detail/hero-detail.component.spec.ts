import { TestBed } from "@angular/core/testing"
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "./hero-detail.component";
import { Location } from '@angular/common';

describe('HeroDetailComponent', () => {
  let fixture, mockActivatedRoute, mockHeroService, mockLocation;

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
      declarations: [HeroDetailComponent],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: HeroService, useValue: mockHeroService},
        {provide: Location, useValue: mockLocation}
      ]
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
  })
})

// PS Unit Tests 6.6 - Testing w/ActivatedRoute
