module.exports = (conf) => {

    class AppInitializationError extends Error{
        constructor(message){
            super()
            this.message = message
        }
    }

    class InvalidRequest extends Error{
        constructor(message){
            super()
            this.statCode = 404;
            this.message = message;
        }
    }

    return { 
        AppInitializationError,
        InvalidRequest
    }
}

