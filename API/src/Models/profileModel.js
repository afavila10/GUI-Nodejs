import { connect } from '../config/db/connect.js';

export const getAllProfiles = async () => {
  const [result] = await connect.query("SELECT * FROM profile");
  return result;
};

export const getProfileById = async (id) => {
  const [result] = await connect.query("SELECT * FROM profile WHERE Profile_id = ?", [id]);
  return result;
};

export const createProfile = async (profileData) => {
  const {
    name, last_name, document, email, phone,
    photo, address, document_type, user_id
  } = profileData;

  const [result] = await connect.query(
    `INSERT INTO profile (
      Profile_name, Profile_last_name, Profile_document,
      Profile_email, Profile_phone, Profile_photo,
      Profile_address, Document_type_fk, User_fk
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, last_name, document, email, phone, photo, address, document_type, user_id]
  );

  return result;
};

export const updateProfileById = async (id, profileData, updated_at) => {
  const {
    name, last_name, document, email, phone,
    photo, address, document_type
  } = profileData;

  const [result] = await connect.query(
    `UPDATE profile SET
      Profile_name = ?, Profile_last_name = ?, Profile_document = ?,
      Profile_email = ?, Profile_phone = ?, Profile_photo = ?,
      Profile_address = ?, Document_type_fk = ?, Updated_at = ?
     WHERE Profile_id = ?`,
    [name, last_name, document, email, phone, photo, address, document_type, updated_at, id]
  );

  return result;
};

export const deleteProfileById = async (id) => {
  const [result] = await connect.query("DELETE FROM profile WHERE Profile_id = ?", [id]);
  return result;
};
