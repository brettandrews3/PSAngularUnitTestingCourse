import { MessageService } from "./message.service"

describe('MessageService', () => {
  let service: MessageService

  // Insure a brand new MessageService for each test
  // Our 'arrange' is inside beforeEach(), breaking the 'tell a story' rule
  // Therefore, we'll move 'service = new MessageService()' into each test:
  beforeEach(() => {
    //service = new MessageService();
  })

  // Testing initial state of our test; Doesn't have
  it('should have no messages to start', () => {
    // ACT: create a fresh instance of MessageService
    service = new MessageService();

    // What should we find in the test
    expect(service.messages.length).toBe(0);
  })

  // New test: add msg when add() is called
  it('should add a message when add is called', () => {
    // ACT: create a fresh instance of MessageService
    service = new MessageService();

    // Send the message and exepct to find it: here's the ACT
    service.add('message1');

    expect(service.messages.length).toBe(1);
  })

  // This test clears out the test results
  it('should remove all tests when clear() is called', () => {
    service = new MessageService();
    service.add('message1');

    service.clear();

    expect(service.messages.length).toBe(0);
  })
})
