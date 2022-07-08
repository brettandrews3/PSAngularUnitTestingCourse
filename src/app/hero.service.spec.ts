import { TestBed } from "@angular/core/testing"
import { HeroService } from "./hero.service"
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

// PS Unit Tests 5.4 - Integration Testing of Services

describe('HeroService', () => {
  let mockMessageService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        {provide: MessageService, useValue: mockMessageService}
      ]
    });

    // Get a handle to the HttpTestingController
    httpTestingController = TestBed.inject(HttpTestingController);

    // Get a handle to a service (example)
    //let msgSvc = TestBed.inject(MessageService);
  })
})
