import { Postgres } from "../../lib/pg.js";

export class GroupRepository extends Postgres {
  async insert(newGroup) {
    return await this.fetch(
      "INSERT INTO groups (name, brand_id, head_teacher_id, room_id) VALUES ($1, $2, $3, $4) returning *",
      newGroup.name,
      newGroup.brand_id,
      newGroup.head_teacher_id,
      newGroup.room_id
    );
  }

  async findAll() {
    return await this.fetchAll("SELECT * from groups");
  }

  async findOneById(groupId) {
    return await this.fetch("SELECT * from groups where id = $1", groupId);
  }

  async findByName(groupName) {
    return await this.fetch("SELECT * from groups where name = $1", groupName);
  }

  async delete(groupId) {
    return await this.fetch(
      "DELETE FROM groups WHERE id = $1 returning *",
      groupId
    );
  }
}
