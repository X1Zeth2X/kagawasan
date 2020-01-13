import { ApiService, backendUrl } from "./api.service";
import TokenService from "./token.service";
import { User } from "@/store/modules/auth/types";

class AuthError extends Error {
  constructor(message: string) {
    super(message);

    this.name = this.constructor.name;
    this.message = this.message;
  }
}

interface RegisterData {
  email: string;
  username: string;
  full_name: string;
  password: string;
  entry_key: string;
}

const AuthService = {
  async register(data: RegisterData) {
    const resource = `${backendUrl}/auth/register`;

    try {
      const apiResponse = await ApiService.post(resource, data);

      const accessToken: string = apiResponse.data.Authorization;
      const user: User = apiResponse.data.user;

      return {
        accessToken,
        user
      };
    } catch (error) {
      if (error.message === "Network Error") {
        throw new Error("Network Error");
      } else {
        throw new AuthError(error.response.data.message);
      }
    }
  }, // Register

  async login(email: string, password: string) {
    const resource: string = `${backendUrl}/auth/login`;

    try {
      const apiResponse = await ApiService.post(resource, {
        email,
        password
      });

      const accessToken: string = apiResponse.data.Authorization;
      const user: User = apiResponse.data.user;

      return {
        accessToken,
        user
      };
    } catch (error) {
      throw new AuthError(error.response.data.message);
    }
  }, // Login

  logout() {
    TokenService.removeToken();
    ApiService.removeHeader();
  }
};

export default AuthService;
export { AuthService, AuthError, RegisterData };
