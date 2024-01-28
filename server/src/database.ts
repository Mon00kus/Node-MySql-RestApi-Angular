import mysql from 'mysql2/promise';
import keys from './keys';

const pool = mysql.createPool(keys.database);

pool.getConnection();

export default pool;