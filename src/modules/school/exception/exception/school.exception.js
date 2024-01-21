export class SchoolAlreadyExistFoundByName extends Error {
  constructor() {
    super("School already exist");
    this.statusCode = 403;
  }
}

export class SchoolNotFoundById extends Error {
  constructor() {
    super("School not found by id");
    this.statusCode = 404;
  }
}

export class SchoolBadRequest extends Error {
  constructor(messages) {
    super(messages);
    this.statusCode = 400;
  }
}
