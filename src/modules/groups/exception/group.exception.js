export class GroupAlreadyExistFoundByName extends Error {
  constructor() {
    super("Group already exist");
    this.statusCode = 403;
  }
}

export class GroupNotFoundById extends Error {
  constructor() {
    super("Group not found by id");
    this.statusCode = 404;
  }
}

export class GroupBadRequest extends Error {
  constructor(messages) {
    super(messages);
    this.statusCode = 400;
  }
}
