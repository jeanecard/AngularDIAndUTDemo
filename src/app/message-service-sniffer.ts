import { MessageServiceInterface } from './message-service-interface';

/**
 * class for purpose test only.
 */
export class MessageServiceSniffer implements MessageServiceInterface {
    /**
     * Count messages logged.
     */
    public _counter: number = 0;
    /**
     * ++ counter
     * @param message : No restriction. Not used.
     */
    public add(message: string): void {
        this._counter++;
    }
    /**
     * Clear counter
     */
    public clear(): void {
        this._counter = 0;
    }

}
