import {IMessageProcessor} from '../interfaces/IMessageProcessor';

export class ByeProcessor implements IMessageProcessor {
  
  canProcessMessage(message: any): boolean {
    return message.text.toLowerCase().includes('bye');
  }  
  
  processMessage(message: any, api: any): void {
    const payload = {
      chat_id: message.chat.id,
      text: `bye, ${message.chat.first_name}`
    };
    api.sendMessage(payload, () => console.log(payload));
  }
}