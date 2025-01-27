export default class API {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
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

  updateResource(id, data) {
    return fetch(`${this._baseUrl}/resources/${id}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return responese.json();
        }
        return Promise.reject(`Error: ${response.status}`);
      })
      .catch((error) => console.error("Error", error));
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Error: ${response.status}`);
      })
      .then((data) => {
        console.log("Card added:", data);
      })
      .catch((error) => console.error("Error adding card:", error));
  }
}

const api = new API({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c371b666-258b-4f19-aeb9-028c93427d7f",
    "Content-Type": "application/json",
  },
});
