import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MessageService } from './message.service';



describe('MessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageService = TestBed.get(MessageService);
    expect(service).toBeTruthy();
  });
  it('should log on new', () => {
    const service: MessageService = TestBed.get(MessageService);
    let messages:string[] = service.messages;
    expect(messages && messages.length == 1).toBeTruthy();
  });
});
