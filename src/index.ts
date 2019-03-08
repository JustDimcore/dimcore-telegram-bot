import { HelloProcessor } from "./messageProcessors/HelloProcessor";
import { ByeProcessor } from "./messageProcessors/ByeProcessor";
import { IMessageProcessor } from "./interfaces/IMessageProcessor";
import { TimerProcessor } from "./messageProcessors/TimerProcessor";
import { UserMessageSender } from "./UserMessageSender";
import { IUserMessage } from "./interfaces/IUserMessage";

var telegram = require('telegram-bot-api');
var fs = require('fs');

const tokenPath = 'token';

if (!fs.existsSync(tokenPath)) {
  throw new Error(`Token file not found by path: ${tokenPath}`);
}

var api = new telegram({
        token: fs.readFileSync(tokenPath, 'utf8'),
        updates: {
          enabled: true
        }
});
 
const excludingProcessors: IMessageProcessor[] = [
  new HelloProcessor(),
  new ByeProcessor(),
  new TimerProcessor()
];

const chainingProcessors: IMessageProcessor[] = [
];

api.getMe()
.then((data: any) =>
{
    console.log(data);
})
.catch((err: any) =>
{
    console.log(err);
});

api.on('message', (message: any) =>
{
    // Received text message
    console.log(message);

    if(!(message as IUserMessage).text)
      return;
      
    const userMessageSender = new UserMessageSender(message.from.id, api);

    const greedyProcessor = excludingProcessors.find(processor => processor.canProcessMessage(message));
    if (greedyProcessor) {
      greedyProcessor.processMessage(message, userMessageSender);
    } else {
      chainingProcessors
        .filter(processor => processor.canProcessMessage(message))
        .forEach(processor => processor.processMessage(message, userMessageSender));
    }
});

api.on('edited.message', (message: any) =>
{
    // Message that was edited
    console.log('edited.message');
    console.log(message);
});