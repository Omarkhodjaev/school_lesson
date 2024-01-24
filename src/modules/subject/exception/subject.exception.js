export class SubjectAlreadyExistFoundByName extends Error {
  constructor() {
    super("Subject already exist");
    this.statusCode = 403;
  }
}

export class SubjectNotFoundById extends Error {
  constructor() {
    super("Subject not found by id");
    this.statusCode = 404;
  }
}

export class SubjectBadRequest extends Error {
  constructor(messages) {
    super(messages);
    this.statusCode = 400;
  }
}
