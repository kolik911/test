const url = "https://cloud-ua1.webitel.com/engine/";

class API {
  static async auth(data) {
    const response = await fetch(`${url}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const content = await response.json();

    if (!response.ok) throw new Error(content.info);

    return content;
  }
  static async getListUsers(data) {
    const response = await fetch(`${url}api/v2/accounts`, {
      method: "GET",
      headers: {
        "X-Access-Token": data.token,
        "X-Key": data.key
      }
    });
    const content = await response.json();
    return content;
  }

  static async logOut(data) {
    const response = await fetch(`${url}logout`, {
      method: "POST",
      headers: {
        "X-Access-Token": data.token,
        "X-Key": data.key
      }
    });

    const content = await response.json();

    if (!response.ok) throw new Error("logout error");

    return content;
  }
}

export default API;
