import { Postgres } from "../../lib/pg.js";

export class UserParentsRepository extends Postgres {
  async findAll() {
    return await this.fetchAll(
      "SELECT up.id, (SELECT JSONB_BUILD_OBJECT('id', u.id, 'login', u.login, 'role', u.role) from users u inner join user_parents up ON u.id = up.parent_id) as parent, (SELECT JSONB_BUILD_OBJECT('id', u.id, 'login', u.login, 'role', u.role) from users u inner join user_parents up on u.id = up.child_id) as child from user_parents up;"
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
