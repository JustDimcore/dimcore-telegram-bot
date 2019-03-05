var telegram = require('telegram-bot-api');

var api = new telegram({
        token: '<your-token>',
        updates: {
          enabled: true
        }
});

api.getMe()
.then(function(data)
{
    console.log(data);
})
.catch(function(err)
{
    console.log(err);
});

api.on('message', message =>
{
    // Received text message
    console.log(message);

    if(message.text.toLowerCase().includes('hi')) {
      cheerUser(message.chat);
    }
});

api.on('edited.message', function(message)
{
    // Message that was edited
    console.log('edited.message');
    console.log(message);
});

function cheerUser(chat) {
  const payload = {
    chat_id: chat.id,
    text: `hi, ${chat.first_name}`
  };
  api.sendMessage(payload, 
  result => console.log(payload));
}