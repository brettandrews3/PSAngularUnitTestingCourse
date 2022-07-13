import { of } from "rxjs/internal/observable/of";
import { Hero } from "../hero";
import { HeroesComponent } from "./heroes.component";

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let HEROES: Hero[];
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      {id:1, name: 'SpiderDude', strength: 8},
      {id:2, name: 'Wonder Woman', strength: 24},
      {id:3, name: 'Superboy', strength: 55}
    ]

    // Passing in array of method names here.
    // Leave array blank if object has no methods.
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    component = new HeroesComponent(mockHeroService);
  })

  // MY TEST: get initial array of heroes
  describe('getHeroes()', () => {
    it('should return the array of HEROES', () => {
      mockHeroService.getHeroes.and.returnValue(of(true));
      component.heroes = HEROES;

      expect(component.heroes.length).toBe(3);
    })
  })

  // MY TEST: adds a hero to the list
  describe('add', () => {
    it('should add LebowskiHero to the list', () => {

      // Arrange: setup mockHeroService HEROES[]
      mockHeroService.addHero.and.returnValue(of(true));
      component.heroes = HEROES;

      // Act: add hero to end of index
      component.add('LebowskiHero');

      // Assert: confirm that HEROES returns array of 4 objects, not 3
      expect(component.heroes.length).toBe(4);
    })
  })

  describe('delete', () => {
    it('should remove indicated hero from the list', () => {

      // Arrange: variable 'component' holds array of HEROES
      // Tell deleteHero() to return an observable. Call the 'and' mock property
      // created by Jasmine. Tell it to return the value passed into the 'of' method,
      // which is 'true'. This is the simplest way to return an observable.
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      // Act: delete the Hero at index 2
      component.deleteHero(HEROES[2]);

      // Assert: confirm that HEROES returns array of 2 objects, not 3
      expect(component.heroes.length).toBe(2);
    })

    // Interaction test:
    it('should call deleteHero() with the correct hero', () => {
      // Arrange
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      // Act
      component.deleteHero(HEROES[2]);

      // Assert
      //expect(mockHeroService.deleteHero).toHaveBeenCalled()  OR use this:
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    })
  })

  // Interaction tests: check that something happened between tested class
  // and a collaborator class:

})
