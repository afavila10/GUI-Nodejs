// Models/apiUserModel.js
import { connect } from '../config/db/connect.js';

export const getAllApiUsers = async () => {
  const [rows] = await connect.query("SELECT * FROM api_users");
  return rows;
};

export const getApiUserById = async (id) => {
  const [rows] = await connect.query("SELECT * FROM api_users WHERE Api_user_id = ?", [id]);
  return rows[0];
};

export const getApiUserByUsername = async (username) => {
  const [rows] = await connect.query("SELECT * FROM api_users WHERE Api_user = ?", [username]);
  return rows[0];
};

export const insertApiUser = async ({ user, password, status, role }) => {
  const [result] = await connect.query(
    "INSERT INTO api_users(Api_user, Api_password, Api_status, Api_role) VALUES (?, ?, ?, ?)",
    [user, password, status, role]
  );
  return { id: result.insertId };
};

export const updateApiUserById = async ({ id, user, password, status, role, updated_at }) => {
  const [result] = await connect.query(
    "UPDATE api_users SET Api_user=?, Api_password=?, Api_status=?, Api_role=?, Updated_at=? WHERE Api_user_id=?",
    [user, password, status, role, updated_at, id]
  );
  return result.affectedRows;
};

export const deleteApiUserById = async (id) => {
  const [result] = await connect.query("DELETE FROM api_users WHERE Api_user_id = ?", [id]);
  return result.affectedRows;
};
