class FetchError extends Error {
    public response: Response;
    public status: number;

    constructor(response: Response) {
        super('');
        this.response = response;
        this.status = response.status;
    }
}

export default FetchError;