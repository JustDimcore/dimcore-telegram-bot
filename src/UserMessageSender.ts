import { ISendMessage } from "./interfaces/ISendMessage";

export class UserMessageSender implements ISendMessage {

    constructor(private _chatId: number, private _api: ISendMessage) {        
    }

    sendMessage(message: any, additional?: any, finishCallback?: (res: any) => any): void {
        let response = {
            chat_id: this._chatId,
            text: message
        }
        if (additional)
            response = Object.assign(response, additional);
        this._api.sendMessage(response, finishCallback);
    };
}