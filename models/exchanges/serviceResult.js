class ServiceResult {
    responseMessage;
    payload;
    isSucceed;
    statusCode;

    ServiceResultSuccess (payload, statusCode = 200, responseMessage = ""){
        this.responseMessage = responseMessage;
        this.payload = payload;
        this.isSucceed = true;
        this.statusCode = statusCode;

        return this;
    }

    ServiceResultError (responseMessage = "", statusCode = 500){
        this.responseMessage = responseMessage;
        this.payload = null;
        this.isSucceed = false;
        this.statusCode = statusCode;

        return this;
    }

}

module.exports = ServiceResult;