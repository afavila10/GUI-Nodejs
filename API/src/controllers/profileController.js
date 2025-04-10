import {
  getAllProfiles,
  getProfileById,
  createProfile,
  updateProfileById,
  deleteProfileById
} from "../Models/profileModel.js";

export const showProfiles = async (req, res) => {
  try {
    const result = await getAllProfiles();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error fetching profiles", details: error.message });
  }
};

export const showProfileById = async (req, res) => {
  try {
    const result = await getProfileById(req.params.id);
    if (result.length === 0) return res.status(404).json({ error: "Profile not found" });
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Error fetching profile", details: error.message });
  }
};

export const addProfile = async (req, res) => {
  try {
    const profileData = req.body;
    const required = ["name", "last_name", "document", "email", "phone"];
    const missing = required.find(field => !profileData[field]);

    if (missing) {
      return res.status(400).json({ error: `Missing required field: ${missing}` });
    }

    const result = await createProfile(profileData);
    res.status(201).json({
      data: [{ id: result.insertId, ...profileData }],
      status: 201
    });
  } catch (error) {
    res.status(500).json({ error: "Error adding profile", details: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const profileData = req.body;
    const required = ["name", "last_name", "document", "email", "phone"];
    const missing = required.find(field => !profileData[field]);

    if (missing) {
      return res.status(400).json({ error: `Missing required field: ${missing}` });
    }

    const updated_at = new Date().toISOString().slice(0, 19).replace("T", " ");
    const result = await updateProfileById(req.params.id, profileData, updated_at);

    if (result.affectedRows === 0) return res.status(404).json({ error: "Profile not found" });

    res.status(200).json({
      data: [{ ...profileData, updated_at }],
      status: 200,
      updated: result.affectedRows
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating profile", details: error.message });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const result = await deleteProfileById(req.params.id);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Profile not found" });

    res.status(200).json({
      data: [],
      status: 200,
      deleted: result.affectedRows
    });
  } catch (error) {
    res.status(500).json({ error: "Error deleting profile", details: error.message });
  }
};

