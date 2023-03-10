import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 
 *
 */

class WeatherApi {
  // the token for interactions with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${WeatherApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get the current user. */

  static async getUser(user) {
    let res = await this.request(`users/${user}`);
    return res.user;
  }

  /** Get token for login from username, password. */

  static async loginUser(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup for site. */

  static async registerUser(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Get New Location */
  static async getNewLocation(location) {
    let res = await this.request(`location/${location}`);
    return res.apiResponse;
  }

  /** Post New Location */
  static async postNewLocation(username, data) {
    let res = await this.request(`location/${username}`, data, "post");
    return res.apiResponse;
  }

  /** Get Saved Location */
  static async getLocation(username, id) {
    let res = await this.request(`location/${username}/${id}`);
    return res.location;
  }

  /** Delete Location */
  static async deleteLocation(username, id) {
    let res = await this.request(`location/${username}/${id}`, {}, "delete");
    return res;
  }

  /** Get Weather */
  static async getWeather(lat, lon) {
    let res = await this.request(`weather/`, { lat: lat, lon: lon }, "get");
    return res;
  }
}

export default WeatherApi;
