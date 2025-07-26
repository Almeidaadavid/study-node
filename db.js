import postgres from "postgres";
import 'dotenv/config'

const { DATABASE_URL } = process.env;
const url = DATABASE_URL;

export const sql = postgres(url, { ssl: 'require' });

// export default sql = postgres({
//     connection: 
// });

