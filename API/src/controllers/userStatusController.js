import {
  getAllUserStatus,
  getUserStatusById,
  createUserStatus,
  updateUserStatusById,
  deleteUserStatusById
} from "../Models/userStatusModel.js";

export const showUserStatus = async (req, res) => {
  try {
    const result = await getAllUserStatus();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error fetching UserStatus", details: error.message });
  }
};

export const showUserStatusId = async (req, res) => {
  try {
    const result = await getUserStatusById(req.params.id);
    if (result.length === 0) return res.status(404).json({ error: "UserStatus not found" });
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Error fetching UserStatus", details: error.message });
  }
};

export const addUserStatus = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await createUserStatus(name, description);

    res.status(201).json({
      data: [{ id: result.insertId, name, description }],
      status: 201
    });
  } catch (error) {
    res.status(500).json({ error: "Error adding UserStatus", details: error.message });
  }
};

export const updateUserStatus = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const updated_at = new Date().toISOString().slice(0, 19).replace("T", " ");
    const result = await updateUserStatusById(req.params.id, name ,description, updated_at);
    if (result.affectedRows === 0) return res.status(404).json({ error: "UserStatus not found" });

    res.status(200).json({
      data: [{ name, description, updated_at }],
      status: 200,
      updated: result.affectedRows
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating UserStatus", details: error.message });
  }
};

export const deleteUserStatus = async (req, res) => {
  try {
    const result = await deleteUserStatusById(req.params.id);
    if (result.affectedRows === 0) return res.status(404).json({ error: "UserStatus not found" });

    res.status(200).json({
      data: [],
      status: 200,
      deleted: result.affectedRows
    });
  } catch (error) {
    res.status(500).json({ error: "Error deleting UserStatus", details: error.message });
  }
};
