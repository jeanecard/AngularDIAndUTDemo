import { Observable } from 'rxjs';
import { MessageServiceInterface } from './message-service-interface';

export interface HeroesGetterInterface {
    /**
     * Construct a GET request which interprets the body as JSON and returns it.
     *
     * @return an `Observable` of the body as type `T`.
     */
    get<T>(url: string): Observable<T>;
    /**
     * DI by property
     * @param messageService 
     */
    setMessageService(messageService: MessageServiceInterface):void;
}
