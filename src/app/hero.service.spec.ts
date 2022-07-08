import { inject, TestBed } from "@angular/core/testing"
import { HeroService } from "./hero.service"
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

// PS Unit Tests 5.4 - Integration Testing of Services
// PS Unit Tests 5.5 - Using inject() Helper Fn

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
    //service = TestBed.inject(HeroService);    - Using inject syntax in it() below

    // Get a handle to a service (example)
    //let msgSvc = TestBed.inject(MessageService);
  })

  // inject() takes in 2 parameters: array[] & the callback() => that is the normal test
  describe('getHero', () => {
    it('should call getHero() w/ the correct URL', () => {
      // Act: call getHero()
      service.getHero(4);

      // Assert: test that the URL was correct

    })
  })
})
