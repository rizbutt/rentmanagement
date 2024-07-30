import { LoginDTO } from "../dtos/LoginDTO";
import { RegisterDTO } from "../dtos/RegisterDTO";

// Interface for authentication service
export interface IAuthService {
  login(loginDTO: LoginDTO): Promise<void>;
  register(registerDTO: RegisterDTO): Promise<void>;
}
