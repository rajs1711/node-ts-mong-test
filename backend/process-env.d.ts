import { Secret } from "jsonwebtoken";

    namespace NodeJS {
      interface ProcessEnv {
        PORT: string | undefined;
        CONN_URL: string |undefined;
        SECRET:Secret;
        // add more environment variables and their types here
      }
    }
  