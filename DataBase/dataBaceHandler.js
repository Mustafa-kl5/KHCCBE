const sql = require("mssql");

const dbConfig = {
  user: "SA",
  password: "P@ssword1234",
  server: "localhost",
  database: "KHCC",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Function to open a connection to the database
const openConnection = async () => {
  try {
    const pool = await sql.connect(dbConfig);
    return pool;
  } catch (error) {
    console.error("Error opening database connection:", error);
    throw error;
  }
};

// Function to close the database connection
const closeConnection = async (pool) => {
  try {
    await pool.close();
  } catch (error) {
    console.error("Error closing database connection:", error);
    throw error;
  }
};

// Function to execute a query
const executeQuery = async (pool, query, params = []) => {
  try {
    const result = await pool.request().query(query, ...params);
    return result;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};

module.exports = {
  openConnection,
  closeConnection,
  executeQuery,
};
