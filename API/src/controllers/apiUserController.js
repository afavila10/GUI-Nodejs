import bcrypt from "bcrypt";
import { encryptPassword, comparePassword } from '../library/appBcrypt.js';
import jwt from "jsonwebtoken";




import {
  getAllApiUsers,
  getApiUserById,
  getApiUserByUsername,
  insertApiUser,
  updateApiUserById,
  deleteApiUserById
} from '../Models/apiUserModel.js';

export const showApiUser = async (req, res) => {
  try {
    const result = await getAllApiUsers();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users", details: error.message });
  }
};

export const showApiUserId = async (req, res) => {
  try {
    const result = await getApiUserById(req.params.id);
    if (!result) return res.status(404).json({ error: "user not found show id" });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user", details: error.message });
  }
};

export const addApiUser = async (req, res) => {
  try {
    const { user, password, status, role } = req.body;
    if (!user || !password || !status || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const hashedPassword = await encryptPassword(password);
    const result = await insertApiUser({ user, password: hashedPassword, status, role });

    res.status(201).json({
      data: [{ id: result.id, user, hashedPassword, status, role }],
      status: 201
    });
  } catch (error) {
    res.status(500).json({ error: "Error adding user", details: error.message });
  }
};

export const updateApiUser = async (req, res) => {
  try {
    const { user, password, status, role } = req.body;
    if (!user || !password || !status || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const updated_at = new Date().toLocaleString("en-CA", { timeZone: "America/Bogota" }).replace(",", "").replace("/", "-").replace("/", "-");
    const result = await updateApiUserById({
      id: req.params.id,
      user,
      password,
      status,
      role,
      updated_at
    });
    if (result === 0) return res.status(404).json({ error: "user not found update" });
    res.status(200).json({
      data: [{ user, status, role, updated_at }],
      status: 200,
      updated: result
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating user", details: error.message });
  }
};

export const deleteApiUser = async (req, res) => {
  try {
    const result = await deleteApiUserById(req.params.id);
    if (result === 0) return res.status(404).json({ error: "user not found" });
    res.status(200).json({
      data: [],
      status: 200,
      deleted: result
    });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user", details: error.message });
  }
};

export const loginApiUser = async (req, res) => {
  try {
    const { api_user, api_password } = req.body;
    const user = await getApiUserByUsername(api_user);
    if (!user) return res.status(400).json({ error: "user not found login" });

    const validPassword = await comparePassword(api_password, user.Api_password);
    if (!validPassword) return res.status(400).json({ error: "Incorrect password" });

    const token = jwt.sign(
      { id: user.Api_user_id, role: user.Api_role, status: user.Api_status },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in user", details: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { user, password, status, role } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await createUser(user, hashedPassword, status, role);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error adding user', details: error.message });
  }
};






