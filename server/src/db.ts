import "dotenv/config";
import { Pool } from "pg";

export default class DatabaseConnection {
  constructor() {}

  async createConnection() {
    return new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }

  async query<T>(queryString: string, data: Array<T>) {
    const connection = await this.createConnection();
    const result = await connection.query(queryString, data);
    await connection.end();
    return result;
  }
}
