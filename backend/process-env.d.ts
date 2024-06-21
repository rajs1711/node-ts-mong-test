import { Secret } from "jsonwebtoken";

    namespace NodeJS {
      interface ProcessEnv {
        PORT: string | undefined;
        CONN_URL: string |undefined;
        SECRET:Secret;
        CLOUDINARY_API_KEY :string;
        CLOUDINARY_API_SECRET :string;
        CLOUDINARY_CLOUDNAME:string;
        // add more environment variables and their types here
      }
    }
  