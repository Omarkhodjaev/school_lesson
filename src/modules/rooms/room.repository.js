import { Postgres } from "../../lib/pg.js";

export class RoomRepository extends Postgres {
  async insert(newRoom) {
    return await this.fetch(
      "INSERT INTO rooms (number, name, floor, capacity, school_id) VALUES ($1,$2,$3,$4,$5) returning *",
      newRoom.number,
      newRoom.name,
      newRoom.floor,
      newRoom.capacity,
      newRoom.school_id
    );
  }

  async findAll() {
    return await this.fetchAll("SELECT * from rooms");
  }

  async findOneById(roomId) {
    return await this.fetch("SELECT * from rooms where id = $1", roomId);
  }

  async findByName(roomName) {
    return await this.fetch("SELECT * from rooms where name = $1", roomName);
  }

  async delete(roomId) {
    return await this.fetch(
      "DELETE FROM rooms WHERE id = $1 returning *",
      roomId
    );
  }
}
