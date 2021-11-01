export class ResponsePayload{
    message:string;
    status:string;
    data: object;
    constructor(message, status, data){
        this.message = message;
        this.status = status;
        this.data = data;
    }
}