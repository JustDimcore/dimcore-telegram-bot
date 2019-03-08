import { IMessageProcessor } from '../interfaces/IMessageProcessor';
import { ISendMessage } from '../interfaces/ISendMessage';
import { IUserMessage } from '../interfaces/IUserMessage';

export class ByeProcessor implements IMessageProcessor {
  
  canProcessMessage(message: IUserMessage): boolean {
    return message.text.toLowerCase().includes('bye');
  }  
  
  processMessage(message: IUserMessage, api: ISendMessage): void {
    const text = `bye, ${message.from.first_name}`;
    api.sendMessage(text, null, () => console.log(text));
  }
}