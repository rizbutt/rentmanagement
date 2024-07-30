import User, { IUser } from '../models/User';

class UserRepository {
  async create(user: IUser): Promise<IUser> {
    const newUser = new User(user);
    await newUser.save();
    return newUser;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }
}

export default UserRepository;
