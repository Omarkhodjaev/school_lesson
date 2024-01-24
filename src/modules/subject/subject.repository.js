import { Postgres } from "../../lib/pg.js";

export class SubjectRepository extends Postgres {
  async insert(newSubject) {
    return await this.fetch(
      "INSERT INTO subjects (name, brand_id) VALUES ($1,$2) returning *",
      newSubject.name,
      newSubject.brand_id
    );
  }
  async findAll() {
    return await this.fetchAll("SELECT * from subjects");
  }
  async findOneById(subjectId) {
    return await this.fetch("SELECT * from subjects where id = $1", subjectId);
  }

  async findByName(subjectName) {
    return await this.fetch(
      "SELECT * from subjects where name = $1",
      subjectName
    );
  }

  async delete(subjectId) {
    return await this.fetch(
      "DELETE FROM subjects WHERE id = $1 returning *",
      subjectId
    );
  }
}
