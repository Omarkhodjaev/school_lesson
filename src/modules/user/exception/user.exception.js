export class UserNotFoundException extends Error {
  constructor() {
    super("user not found");

    this.statusCode = 404;
  }
}

export class UserLoginAlreadyExistException extends Error {
  constructor() {
    super("user login already exist");

    this.statusCode = 400;
  }
}

export class UserNotCreatedException extends Error {
  constructor() {
    super("user not created");

    this.statusCode = 500;
  }
}

export class LoginOrPassWrongException extends Error {
  constructor() {
    super("Login or password wrong please try again!");

    this.statusCode = 500;
  }
}
