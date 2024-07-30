import UserRepository from '../repositories/UserRepository';
import { RegisterDTO } from '../dtos/RegisterDTO';
import bcrypt from 'bcrypt';
import User, { IUser } from '../models/User';

class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(registerDTO: RegisterDTO): Promise<IUser> {
    const existingUser = await this.userRepository.findByEmail(registerDTO.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = bcrypt.hashSync(registerDTO.password, 10);
    const newUser = new User({ ...registerDTO, password: hashedPassword });
    await newUser.save();
    return newUser;
  }

  async login(loginDTO: { email: string; password: string }): Promise<IUser> {
    const user = await this.userRepository.findByEmail(loginDTO.email);
    if (!user || !bcrypt.compareSync(loginDTO.password, user.password)) {
      throw new Error('Invalid credentials');
    }
    return user;
  }
}

export default AuthService;
