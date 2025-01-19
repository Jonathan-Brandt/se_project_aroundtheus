class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headerz = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject("Error:", error);
      })
      .catch((error) => console.error("Error:", error));
  }

  // other methods for working with the API
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c371b666-258b-4f19-aeb9-028c93427d7f",
    "Content-Type": "application/json",
  },
});
