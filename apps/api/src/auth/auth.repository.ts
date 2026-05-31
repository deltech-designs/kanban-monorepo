import { UserModel, UserClass } from './users.model';

export class AuthRepository {
  async findByEmail(email: string) {
    return UserModel.findOne({ email: email.toLowerCase() }).exec();
  }

  async findById(id: string) {
    return UserModel.findById(id).exec();
  }

  async findByGoogleId(googleId: string) {
    return UserModel.findOne({ googleId }).exec();
  }

  async findByResetToken(token: string) {
    return UserModel.findOne({
      resetToken: token,
      resetTokenExpiresAt: { $gt: new Date() },
    }).exec();
  }

  async create(user: Partial<UserClass>) {
    return UserModel.create(user);
  }

  async save(user: any) {
    return user.save();
  }
}
