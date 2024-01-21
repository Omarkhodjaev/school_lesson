import { Postgres } from "../../lib/pg.js";

export class SchoolRepository extends Postgres {
  async insert(newSchool) {
    return await this.fetch(
      "INSERT INTO schools (name, address, latitude, longitude, phone, brand_id) VALUES ($1, $2, $3, $4, $5, $6) returning *",
      newSchool.name,
      newSchool.address,
      newSchool.latitude,
      newSchool.longitude,
      newSchool.phone,
      newSchool.brand_id
    );
  }
  async findAll() {
    return await this.fetchAll("SELECT * from schools");
  }

  async findOneById(schoolId) {
    return await this.fetch("SELECT * from schools where id = $1", schoolId);
  }

  async delete(schoolId) {
    return await this.fetch(
      "DELETE FROM schools WHERE id = $1 returning *",
      schoolId
    );
  }
}
