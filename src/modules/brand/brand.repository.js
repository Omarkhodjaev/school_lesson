import { Postgres } from "../../lib/pg.js";

export class BrandRepository extends Postgres {
  async insert(newBrand) {
    return await this.fetch(
      "INSERT INTO brands (name, is_public) VALUES ($1,$2) returning *",
      newBrand.name,
      newBrand.is_public
    );
  }
  async findAll() {
    return await this.fetchAll("SELECT * from brands");
  }
  async findOneById(brandId) {
    return await this.fetch("SELECT * from brands where id = $1", brandId);
  }

  async findByName(brandName) {
    return await this.fetch("SELECT * from brands where name = $1", brandName);
  }

  async delete(brandId) {
    return await this.fetch(
      "DELETE FROM brands WHERE id = $1 returning *",
      brandId
    );
  }
}
