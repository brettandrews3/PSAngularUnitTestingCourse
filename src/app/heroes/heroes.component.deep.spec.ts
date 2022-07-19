import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { of } from "rxjs/internal/observable/of";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component"

describe('HeroesComponent (deep tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

    beforeEach(() => {
    HEROES = [
      {id:1, name: 'SpiderDude', strength: 8},
      {id:2, name: 'Wonder Woman', strength: 24},
      {id:3, name: 'Superboy', strength: 55}
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroComponent
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    fixture = TestBed.createComponent(HeroesComponent);
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    //fixture.detectChanges();
  });

  it('should render each hero as a HeroComponent', () => {
    // Arrange: in the BeforeEach() as fixture and mockHeroService

    // Act: triggers detectChanges, which triggers ngOnInit()
    fixture.detectChanges();

    // Assert: find child elements through a directive
    // debugElement gets list of all app-hero elements created in the
    // <ul> on heroes.component.html
    const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroComponentDEs.length).toEqual(3);

    for(let i = 0; i < heroComponentDEs.length; i++) {
      expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });

  // Unit Tests 6.2: Trigger Events on Elements
  // const heroComponent is looking for the similarly named directive on ln 15 of heroes.component.html
  it(`should call heroService.deleteHero when the Hero Component's
      delete button is clicked`, () => {
        spyOn(fixture.componentInstance, 'deleteHero');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

        // 6.3 New approach: tell child component to raise the event, then test that parent component
        // is listening for & responds to that event
        //(<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

        // 6.4 New new approach: tell the debug element to just trigger the delete() event
        heroComponents[0].triggerEventHandler('delete', null);

        // 6.2 Initial approach: trigger by event on the element by watching for 'click'
        //heroComponents[0].query(By.css('button'))
        //.triggerEventHandler('click', {stopPropagation: () => {} });

        expect(fixture.componentInstance.deleteHero).toHaveBeenCalledWith(HEROES[0]);
  });

  // 6.5 Test adding a new hero to the hero list when using add button in the application
  // The test interacts with the components in heroes.component.html
  // addButton is querying all the buttons in the DOM, using the add button only in 1st position
  it('should add a new hero to the hero list when add button is clicked', () => {
    // Arrange: get HEROES[]; setup new hero, inputElement, add button from heroes.component.html
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const name = 'Mr. Cool as Ice';
    mockHeroService.addHero.and.returnValue(of({id: 5, name: name, strength: 32}));
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

    // Act: set inputElement's value to the 'name' variable created in this test
    inputElement.value = name;
    addButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Grab text content of all our heroes
    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;

    // Assert: check heroText for new hero Mr. Cool as Ice
    expect(heroText).toContain(name);
  })

});

// PS Unit Tests 5.2 - Creating a Deep Integration Test
// PS Unit Tests 5.3 - Finding Elements by Directive
// PS Unit Tests 6.2 - Triggering Events on Elements
// PS Unit Tests 6.3 - Emitting Events from Children
// PS Unit Tests 6.4 - Raising Event on Child Directive
// PS Unit Tests 6.5 - Interacting w/ Input Boxes
// PS Unit Tests 6.6 - Testing w/ ActivatedRoute
