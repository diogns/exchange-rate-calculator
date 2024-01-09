export class UserEntity {
  userId: number;
  username: string;
  password: string;

  constructor(username: string, password: string, userId: number) {
    this.username = username;
    this.password = password;
    this.userId = userId;
  }
}
