import {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById
} from '../Models/userModel.js';

import { encryptPassword } from '../library/appBcrypt.js';

export const showUser = async (req, res) => {
  try {
    const result = await getAllUsers();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users", details: error.message });
  }
};

export const showUserId = async (req, res) => {
  try {
    const result = await getUserById(req.params.id);
    if (result.length === 0) return res.status(404).json({ error: "User not found" });
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user", details: error.message });
  }
};

export const addUser = async (req, res) => {
  try {
    const { user, password, status, role } = req.body;
    if (!user || !password || !status || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const hashedPassword = await encryptPassword(password);
    const result = await createUser(user, hashedPassword, status, role);
    res.status(201).json({
      data: [{ id: result.insertId, user, hashedPassword, status, role }],
      status: 201
    });
  } catch (error) {
    res.status(500).json({ error: "Error adding user", details: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { user, status, role } = req.body;
    if (!user || !status || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const updated_at = new Date().toISOString().slice(0, 19).replace("T", " ");
    const result = await updateUserById(req.params.id, user, status, role, updated_at);
    if (result.affectedRows === 0) return res.status(404).json({ error: "User not found" });

    res.status(200).json({
      data: [{ user, status, role, updated_at }],
      status: 200,
      updated: result.affectedRows
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating user", details: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const result = await deleteUserById(req.params.id);
    if (result.affectedRows === 0) return res.status(404).json({ error: "User not found" });

    res.status(200).json({
      data: [],
      status: 200,
      deleted: result.affectedRows
    });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user", details: error.message });
  }
};


