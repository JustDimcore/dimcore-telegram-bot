import { IMessageProcessor } from '../interfaces/IMessageProcessor';
import { ISendMessage } from '../interfaces/ISendMessage';
import { IUserMessage } from '../interfaces/IUserMessage';

export class HelloProcessor implements IMessageProcessor {
  
  canProcessMessage(message: IUserMessage): boolean {
    return message.text.toLowerCase().includes('hi');
  }  
  
  processMessage(message: IUserMessage, api: ISendMessage): void {
    const text = `hi, ${message.from.first_name}`;
    api.sendMessage(text, null, () => console.log(text));
  }
}