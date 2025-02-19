export class ErrorHandler extends Error {
    constructor(statusCode, message = "Somthing Went Wrong",errors = [], stack = ""){
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.success = false;
        if(this.stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(
                this,
                this.constructor
            )
        }
    }
}