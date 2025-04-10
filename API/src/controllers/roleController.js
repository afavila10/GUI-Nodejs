
import {
  getAllRoles,
  getRoleById,
  createRole,
  updateRoleById,
  deleteRoleById
} from "../Models/roleModel.js";

export const showRoles = async (req, res) => {
  try {
    const result = await getAllRoles();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Roles", details: error.message });
  }
};

export const showRoleById = async (req, res) => {
  try {
    const result = await getRoleById(req.params.id);
    if (result.length === 0) return res.status(404).json({ error: "Role not found" });
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Role", details: error.message });
  }
};

export const addRole= async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await createRole(name, description);

    res.status(201).json({
      data: [{ id: result.insertId, name, description }],
      status: 201
    });
  } catch (error) {
    res.status(500).json({ error: "Error adding UserStatus", details: error.message });
  }
};



export const updateRole = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const updated_at = new Date().toISOString().slice(0, 19).replace("T", " ");
    const result = await updateRoleById(req.params.id, name, description, updated_at);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Role not found" });

    res.status(200).json({
      data: [{ name, description, updated_at }],
      status: 200,
      updated: result.affectedRows
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating Role", details: error.message });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const result = await deleteRoleById(req.params.id);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Role not found" });

    res.status(200).json({
      data: [],
      status: 200,
      deleted: result.affectedRows
    });
  } catch (error) {
    res.status(500).json({ error: "Error deleting Role", details: error.message });
  }
};
