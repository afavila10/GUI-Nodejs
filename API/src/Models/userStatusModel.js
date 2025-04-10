// src/Models/userStatusModel.js
import { connect } from '../config/db/connect.js';

export const getAllUserStatus = async () => {
  const [result] = await connect.query("SELECT * FROM user_status");
  return result;
};

export const getUserStatusById = async (id) => {
  const [result] = await connect.query("SELECT * FROM user_status WHERE User_status_id = ?", [id]);
  return result;
};

export const createUserStatus = async (name, description) => {
  const [result] = await connect.query(
    "INSERT INTO user_status (User_status_name, User_status_description) VALUES (?, ?)",
    [name, description]
  );
  return result;
};

export const updateUserStatusById = async (id, name, description, updated_at) => {
  const [result] = await connect.query(
    "UPDATE user_status SET User_status_name = ?, User_status_description = ?, Updated_at = ? WHERE User_status_id = ?",
    [name, description, updated_at, id]
  );
  return result;
};

export const deleteUserStatusById = async (id) => {
  const [result] = await connect.query("DELETE FROM user_status WHERE User_status_id = ?", [id]);
  return result;
};
