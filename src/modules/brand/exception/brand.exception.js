export class BrandAlreadyExistFoundByName extends Error {
  constructor() {
    super("Brand already exist");
    this.statusCode = 403;
  }
}

export class BrandNotFoundById extends Error {
  constructor() {
    super("Brand not found by id");
    this.statusCode = 404;
  }
}

export class BrandBadRequest extends Error {
  constructor(messages) {
    super(messages);
    this.statusCode = 400;
  }
}
