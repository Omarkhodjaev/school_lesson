export class RoomAlreadyExistFoundByName extends Error {
  constructor() {
    super("Room already exist");
    this.statusCode = 403;
  }
}

export class RoomNotFoundById extends Error {
  constructor() {
    super("Room not found by id");
    this.statusCode = 404;
  }
}

export class RoomBadRequest extends Error {
  constructor(messages) {
    super(messages);
    this.statusCode = 400;
  }
}
