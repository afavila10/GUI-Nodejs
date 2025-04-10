//import { connect } from '../config/db/connect'; // ajusta si cambia la ruta
import { connect } from '../config/db/connect.js';


// export const getAllUsers = async () => {
//   const [rows] = await connect.query("SELECT * FROM user");
//   return rows;
// };

export const getAllUsers = async () => { 
  const [rows] = await connect.query(`
    SELECT 
      u.User_id,
      u.User_user,
      u.User_status_fk,
      u.Created_at,
      r.Role_name
    FROM user u
    JOIN role r ON u.Role_fk = r.Role_id
  `);
  return rows;
};


export const getUserById = async (id) => {
  const [rows] = await connect.query("SELECT * FROM user WHERE User_id = ?", [id]);
  return rows;
};

export const createUser = async (user, hashedPassword, status, role) => {
  const [result] = await connect.query(
    "INSERT INTO user (User_user, User_password, User_status_fk, Role_fk) VALUES (?, ?, ?, ?)",
    [user, hashedPassword, status, role]
  );
  return result;
};

export const updateUserById = async (id, user, status, role, updated_at) => {
  const [result] = await connect.query(
    "UPDATE user SET User_user=?, User_status_fk=?, Role_fk=?, Updated_at=? WHERE User_id=?",
    [user, status, role, updated_at, id]
  );
  return result;
};

export const deleteUserById = async (id) => {
  const [result] = await connect.query("DELETE FROM user WHERE User_id = ?", [id]);
  return result;
};
