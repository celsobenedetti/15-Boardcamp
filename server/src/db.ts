import "dotenv/config";
import { Pool } from "pg";

export class PoolFactory {
  constructor() {}

  async createConnection() {
    return new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }
}
