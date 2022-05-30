import "dotenv/config";
import { Pool } from "pg";

class DatabaseSingleton {
  private constructor() {}

  private static _instance: DatabaseSingleton;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  private async createConnection() {
    return new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  async query<T>(queryString: string, data: Array<T>) {
    const connection = await this.createConnection();
    const result = await connection.query(queryString, data);
    await connection.end();
    return result;
  }
}

const databaseConnection = DatabaseSingleton.Instance;
export default databaseConnection;
