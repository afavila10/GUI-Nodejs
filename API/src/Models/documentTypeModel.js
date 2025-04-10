import { connect } from '../config/db/connect.js';

export const getAllDocuments = async () => {
  const [result] = await connect.query("SELECT * FROM document_type");
  return result;
};

export const getDocumentById = async (id) => {
  const [result] = await connect.query("SELECT * FROM document_type WHERE document_type_id = ?", [id]);
  return result;
};

export const createDocument = async ({ name, description }) => {
  const [result] = await connect.query(
    "INSERT INTO document_type (Document_type_name, Document_type_description) VALUES (?, ?)",
    [name, description]
  );
  return result;
};

export const updateDocumentById = async (id, { name, description }, updated_at) => {
  const [result] = await connect.query(
    `UPDATE document_type SET
      Document_type_name = ?,
      Document_type_description = ?,
      Updated_at = ?
     WHERE Document_type_id = ?`,
    [name, description, updated_at, id]
  );
  return result;
};

export const deleteDocumentById = async (id) => {
  const [result] = await connect.query("DELETE FROM document_type WHERE document_type_id = ?", [id]);
  return result;
};
