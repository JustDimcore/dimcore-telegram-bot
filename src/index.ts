import { HelloProcessor } from "./messageProcessors/hello-processor";
import { ByeProcessor } from "./messageProcessors/bye-processor";
import { IMessageProcessor } from "./interfaces/IMessageProcessor";

var telegram = require('telegram-bot-api');
var fs = require('fs');

var api = new telegram({
        token: fs.readFileSync('token', 'utf8'),
        updates: {
          enabled: true
        }
});
 
const excludingProcessors: IMessageProcessor[] = [
  new HelloProcessor(),
  new ByeProcessor()
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

    const greedyProcessor = excludingProcessors.find(processor => processor.canProcessMessage(message));
    if (greedyProcessor) {
      greedyProcessor.processMessage(message, api);
    } else {
      chainingProcessors
        .filter(processor => processor.canProcessMessage(message))
        .forEach(processor => processor.processMessage(message, api));
    }
});

api.on('edited.message', (message: any) =>
{
    // Message that was edited
    console.log('edited.message');
    console.log(message);
});