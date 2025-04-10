import { connect } from '../config/db/connect.js';

export const getAllRoles = async () => {
  const [result] = await connect.query("SELECT * FROM role");
  return result;
};

export const getRoleById = async (id) => {
  const [result] = await connect.query("SELECT * FROM role WHERE Role_id = ?", [id]);
  return result;
};

export const createRole = async (name, description) => {
  const [result] = await connect.query(
    "INSERT INTO role (Role_name, Role_description) VALUES (?, ?)",
    [name, description]
  );
  return result;
};

export const updateRoleById = async (id, name, description, updated_at) => {
  const [result] = await connect.query(
    "UPDATE role SET Role_name = ?, Role_description = ?, Updated_at = ? WHERE Role_id = ?",
    [name, description, updated_at, id]
  );
  return result;
};

export const deleteRoleById = async (id) => {
  const [result] = await connect.query("DELETE FROM role WHERE Role_id = ?", [id]);
  return result;
};
