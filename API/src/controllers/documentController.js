
import {
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocumentById,
  deleteDocumentById
} from "../Models/documentTypeModel.js";

export const showDocuments = async (req, res) => {
  try {
    const result = await getAllDocuments();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error fetching documents", details: error.message });
  }
};

export const showDocumentById = async (req, res) => {
  try {
    const result = await getDocumentById(req.params.id);
    if (result.length === 0) return res.status(404).json({ error: "Document not found" });
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Error fetching document", details: error.message });
  }
};

export const addDocument = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await createDocument({ name, description });
    res.status(201).json({
      data: [{ id: result.insertId, name, description }],
      status: 201
    });
  } catch (error) {
    res.status(500).json({ error: "Error adding document", details: error.message });
  }
};

export const updateDocument = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const updated_at = new Date().toISOString().slice(0, 19).replace("T", " ");
    const result = await updateDocumentById(req.params.id, { name, description }, updated_at);

    if (result.affectedRows === 0) return res.status(404).json({ error: "Document not found" });

    res.status(200).json({
      data: [{ name, description, updated_at }],
      status: 200,
      updated: result.affectedRows
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating document", details: error.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const result = await deleteDocumentById(req.params.id);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Document not found" });

    res.status(200).json({
      data: [],
      status: 200,
      deleted: result.affectedRows
    });
  } catch (error) {
    res.status(500).json({ error: "Error deleting document", details: error.message });
  }
};



