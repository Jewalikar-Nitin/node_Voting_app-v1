const candidateModel = require("../models/candidateModel");

async function adminCheck(userData) {
  try {
    if (userData.role == "admin") {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}

async function addCandidate(req, res) {
  if (!adminCheck(req.user))
    return res.status(401).json({ message: "Admin access only" });

  try {
    let data = req.body;
    const candidate = new candidateModel(data);
    const response = await candidate.save();
    if (!response)
      return res.status(403).json({ message: "Something went wrong" });

    return res
      .status(200)
      .json({ message: "Candidate created successfully", response });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function editCandidate(req, res) {
  if (!adminCheck(req.user))
    return res.status(401).json({ message: "Admin access only" });

  try {
    let candidateId = req.params.id;
    const response = await candidateModel.findByIdAndUpdate(
      candidateId,
      req.body,
      {
        new: true,
      },
    );
    return res
      .stauts(200)
      .json({ message: "Candidate updated successfully", response });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteCandidate(req, res) {
  if (!adminCheck(req.user))
    return res.status(401).json({ message: "Admin access only" });

  try {
    let candidateId = req.params.id;
    const response = await candidateModel.findByIdAndDelete(candidateId);
    return res
      .status(200)
      .json({ message: "Candidate deleted successfully", response });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { addCandidate, editCandidate, deleteCandidate };
