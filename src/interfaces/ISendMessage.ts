export interface ISendMessage { 
    sendMessage: (response: any, additional?: any, finishCallback?: (res: any) => any) => void 
}