import { IMessageProcessor } from "../interfaces/IMessageProcessor";

var moment = require('moment');

export class TimerProcessor implements IMessageProcessor {

    public starts: string[] = [
        '/remind',
        '/timer',
        '/напомни',
        '/таймер',
        '/будильник'
    ];

    public hoursStrings: string[] = [
        'h',
        'hour',
        'hours',
        'ч',
        'час',
        'часов',
        'часа'
    ];

    public minutesStrings: string[] = [
        'm',
        'min',
        'minute',
        'minutes',
        'м',
        'мин',
        'минут',
        'минуты',
        'минуту'
    ];

    public secondsStrings: string[] = [
        's',
        'sec',
        'seconds',
        'с',
        'сек',
        'секунд',
        'секунды',
        'секунду'
    ];

    canProcessMessage(message: {text: string}): boolean {
        return this.starts.some(prefix => message.text.toLowerCase().startsWith(prefix))
    }   

    processMessage(message: {text: string, date: number}, api: any): void {
        const hours = this.getPartNumber(message.text, this.hoursStrings);
        const minutes = this.getPartNumber(message.text, this.minutesStrings);
        const seconds = this.getPartNumber(message.text, this.secondsStrings);
        
        console.log(message.date);
        const remindTime = moment(message.date * 1000)
        .add(hours, 'hours')
        .add(minutes, 'minutes')
        .add(seconds, 'seconds');

        const msLeft = remindTime.diff(moment());

        setTimeout(() => api.sendMessage("I reminded you as you asked", null, console.log('reminder called')), msLeft);
    }

    private getPartNumber(message: string, words: string[]): Number {
        const regExp = this.getPartRegExp(words);
        const res = regExp.exec(message);
        if(!res)
            return 0;
        return Number.parseInt(res[1]);
    }

    private getPartRegExp(words: string[]): RegExp {
        const joinedWords = words.join('|');
        return new RegExp(`(\\d+)\\s*(${joinedWords})[.\\s]*`);
    }
}