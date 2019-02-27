import { TestBed, async } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { doesNotThrow } from 'assert';
import { HEROES_2018 } from './mock-heroes';
import { MessageServiceSniffer } from './message-service-sniffer';
import { MessageService } from './message.service';
// import { MessageService } from './message.service';

describe('HeroService', () => {
  //dumb url to show that the called webservice can not reply.
  const baseUrl = 'http://jean.ecard.com:1234';
  let service = null, httpInterceptor = null;
  beforeEach(() => {
    //Supply variable for test
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        HttpClientModule
      ],
      providers: [HeroService]
    }).compileComponents();
    //Set the variables by injecting the correct instance for test purpose
    //Configures HttpClientTestingBackend as the HttpBackend used by HttpClient.
    httpInterceptor = TestBed.get(HttpTestingController);
    service = TestBed.get(HeroService);
    service.setBaseUrl(baseUrl);
  });

  afterEach(() => {
    //Check that no http headers are pending after test. This one is specific to httpService and must be done.
    httpInterceptor.verify();
  });

  //The simplest test
  it('should be created', () => {
    //const service: HeroService = TestBed.get(HeroService); useless as we instanciate service in beforeeach via DI
    expect(service).toBeTruthy();
  });

  /**
   *Test that we send the correct URL and that the result is correctly returned by the service 
    // 1- Check that service is instancied
    // 2- Call the rest API and on return, test that the result returned by the service is unchanged compare to the http response
    //    2.4- In the response : Check the the data returned by the server are not updated or modified by the service 
    //    2.5- In the response : The test is done, we return the result to Jasmine otherwise, we'll get a time out
    //    2.1- The http get is sent at this very moment, so let's check it.
    //    2.2- Check that request is not null and is unique
    //    2.3- Simulate posted data from Backend (we return HEROES_2018)
   */
  it('Should send the correct Rest URL and return the corresponding response in its property', (done) => {
    //1- 
    expect(service).toBeTruthy();
    //2-
    service.getHeroes().subscribe(result => {
      //2.4-
      expect(result).toEqual(HEROES_2018);
      //2.5
      done();
    });
    //2.1-
    const request = httpInterceptor.expectOne(baseUrl + "/heroes2018");
    //2.2-
    expect(request).toBeTruthy();
    //2.3-
    request.flush(HEROES_2018);
  });


  /**
   * Test that one message and only one should be log on GetHeroes.
   * This test is used to show that dependency injection is mandatory to test a class.
   * 1- Instanciate a messageService 
   *  1.1- the same as in service MessageService
   *  1.1 bis- a stubbed one that only count message and don't log on construtor.
   * 2- Inject this service by property
   * 3- On response check that only one message has been logged.
   *  3.1- The test failed with 1.1 as MessageService log on construcotr too (We must not depend on implementation)
   *  3.1 bis- This test succeed, the service log one and only one message on GetHeroes.
   * 
   */
  it('should log one message on GetHeroes', (done) => {
    //1.1 bis
    //let sniffMessageService: MessageServiceSniffer = new MessageServiceSniffer();
    //1.1-
    //With this one, test fail as construcotr of this service log a message :
    let sniffMessageService:MessageService = new MessageService(); 

    //2-
    service.setMessageService(sniffMessageService);
    //3-
    service.getHeroes().subscribe(result => {
      //3.1-
      //3.never
      //When returning reference of your messages, everyone can update it without using the interface contract Add or Clear  .... Is that wanted ?
      //sniffMessageService.messages.pop();
      expect(sniffMessageService.messages.length == 1).toBeTruthy();
      //Don't forget the "toBeTruthy" or test always succeed :-)
      //3.1bis
      //expect(sniffMessageService._counter === 1).toBeTruthy();
      //The test is done, we return the result to Jasmine otherwise, we'll get a time out
      done();
    });
    const request = httpInterceptor.expectOne(baseUrl + "/heroes2018");
    //Simulate posted data from Backend (we return HEROES_2018)
    request.flush(HEROES_2018);
  });
});
