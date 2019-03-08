export interface IUserMessage { 
    text: string,
    date: number,
    from: {
        id: number,
        first_name: string,
        last_name: string,
        username: string,
    }
}