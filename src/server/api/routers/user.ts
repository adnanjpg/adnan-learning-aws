import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createConnection } from "mysql";
// import { env } from "~/env.mjs";

const getConnection = async () => {
  const env = process.env;
  const con = createConnection({
    host: env.MYDB_HOST,
    port: parseInt(env.MYDB_PORT!),
    user: env.MYDB_USER,
    password: env.MYDB_PASS,
    database: env.MYDB_NAME,
  });

  await new Promise((resolve, reject) => {
    con.connect((err) => {
      if (err) {
        console.error("db.connect error", err);

        reject(err);

        con.end();

        return;
      }

      console.log("Connected to db");

      resolve(true);
    });
  });

  await new Promise((resolve, reject) => {
    con.query(
      `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )`,
      (err, result) => {
        if (err) {
          console.error("query error", err);

          reject(err);

          return;
        }

        console.log("Result: ", result);

        resolve(result);
      },
    );
  });

  return con;
};

const executeQuery = async (query: string) => {
  const con = await getConnection();

  await new Promise((resolve, reject) => {
    con.query(query, (err, result) => {
      if (err) {
        console.error("query error", err);

        reject(err);

        return;
      }

      console.log("Result: ", result);

      resolve(result);
    });
  }).finally(() => {
    con.end();
  });

  return true;
};

export const userRouter = createTRPCRouter({
  addName: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      await executeQuery(`INSERT INTO users (name) VALUES ('${input.name}')`);

      return input;
    }),
});
