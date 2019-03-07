export interface IMessageProcessor {
  canProcessMessage(message: any): boolean;
  processMessage(message: any, api: any): void;  
}