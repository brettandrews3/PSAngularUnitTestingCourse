import { TestBed } from "@angular/core/testing"
import { HeroService } from "./hero.service"
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

// PS Unit Tests 5.4 - Integration Testing of Services
// PS Unit Tests 5.5 - Using inject() Helper Fn
// PS Unit Tests 5.6 - Implementing Tests w/Mocked HTTP

describe('HeroService', () => {
  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let service: HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        HeroService,
        {provide: MessageService, useValue: mockMessageService}
      ]
    });

    // Get a handle to the HttpTestingController
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HeroService);

    // Get a handle to a service (example)
    //let msgSvc = TestBed.inject(MessageService);
  })

  // inject() takes in 2 parameters: array[] & the callback() => that is the normal test (DELETED).
  // getHero() returns an observable. We subscribe to that observ. or the call won't happen.
  // expectOne() takes in the URL that we're expecting to get called.
  // verify() confirms that it's only requests we expected and no extra ones.
  describe('getHero', () => {
    it('should call getHero() w/ the correct URL', () => {
      // Act: call getHero()
      service.getHero(4).subscribe(hero => {
        expect(hero.id).toBe(4);
      });

      // Assert: test that the URL was correct
      const req = httpTestingController.expectOne('api/heroes/4');

      req.flush({id: 4, name: 'WesternStranger', strength: 100});
      expect(req.request.method).toBe('GET');
      httpTestingController.verify();
    })
  })
})
