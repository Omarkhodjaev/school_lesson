export class UserParentsNotFoundException extends Error {
  constructor() {
    super("user not found");

    this.statusCode = 404;
  }
}

export class UserParentsParentOrStudentNotFoundException extends Error {
  constructor() {
    super("student or parent not found, check both again");

    this.statusCode = 404;
  }
}


export class UserParentsNotCreatedException extends Error {
  constructor() {
    super("user_parents not created");

    this.statusCode = 500;
  }
}


