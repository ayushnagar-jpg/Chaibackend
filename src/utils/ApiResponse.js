class ApiResponse {
    constructor(success, message, data) {
        this.success = statusCode < 400;
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
    }
}
export { ApiResponse}