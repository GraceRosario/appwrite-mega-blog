import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
  }

  // await pauses the async function until the Promise settles, then returns its result or throws an error.

  // A Promise represents a result that may be available now or in the future, either successfully or with an error.

  // - create() is the method.
  // - The method returns a Promise representing the result of the server request.
  // - await waits for that Promise to settle and gives you the result if successful.
  // Think of it as:

  // Method → returns a Promise → await gets the result.

  async createAccount({ email, password, name }) {
    try {
      // appwrite sdk has default return, so this does create userAccount
      const userAccount = await this.account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });

      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({ email, password });
    } catch (error) {
      throw error;
    }
  }

  async getCurrentuser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
