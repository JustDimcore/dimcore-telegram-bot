import {IMessageProcessor} from '../interfaces/IMessageProcessor';

export class HelloProcessor implements IMessageProcessor {
  
  canProcessMessage(message: any): boolean {
    return message.text.toLowerCase().includes('hi');
  }  
  
  processMessage(message: any, api: any): void {
    const payload = {
      chat_id: message.chat.id,
      text: `hi, ${message.chat.first_name}`
    };
    api.sendMessage(payload, () => console.log(payload));
  }
}