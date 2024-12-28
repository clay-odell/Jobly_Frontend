import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "https://jobly-backend-7rbk.onrender.com";

class JoblyApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
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

  //Auth Route Helpers

  /** User login returns token and user */ 
  static async userLogin(data) {
    let res = await this.request("auth/token", data, "post");
    return { token: res.token, user: res.user };
  }

  /** Registers a new user */ 
  static async registerUser(data) {
    let res = await this.request("auth/register", data, "post");
    JoblyApi.token = res.token;
    return { token: res.token, user: res.user };
  }

  /** Gets user by username */
  static async getUser(username) {
    let res = await this.request(`users/${username}`, {}, "get");
    return res;
  }

  /** Updates an existing user */
  static async updateUser(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
  /** Allows users to apply for job */
  static async applyToJob(username, jobId) { 
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post"); 
    return res; 
  }

  //Company Route Helpers

  /** Get details on all companies */ 
  static async getCompanies() {
    let res = await this.request("companies/", {}, "get");
    return res;
  }

  /** Get details on a company by handle. */ 
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Update details on a company by handle */ 
  static async updateCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  //Search Bar Helper Logic
  /** Jobs Search Bar */ 
  static async searchJobs(data) {
    let res = await this.request("jobs", data);
    return res;
  }

  static async searchCompanies(data) {
    let res = await this.request("companies", data);
    return res;
  }

  //Jobs Route Helper Logic
  /** Gets all jobs */ 
  static async getJobs() {
    let res = await this.request("jobs", {}, "get");
    return res;
  }

  /** Get job by id */ 
  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }
}

export default JoblyApi;
