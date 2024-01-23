import { Postgres } from "../../lib/pg.js";

export class UserParentsRepository extends Postgres {
  async findAll() {
    return await this.fetchAll(
      "SELECT u.id as user_parent_id, row_to_json(u) as parent FROM user_parents up INNER JOIN users u ON up.parent_id = u.id"
    );
  }

  async findOneById(id) {
    return await this.fetch("select * from users where id = $1", id);
  }

  async insert(userParentsEntity) {
    return await this.fetch(
      `insert into user_parents
    (child_id, parent_id)
    values ($1, $2) returning *
    `,
      userParentsEntity.child_id,
      userParentsEntity.parent_id
    );
  }
}
