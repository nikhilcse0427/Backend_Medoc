import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
  name: String,
  location: String,
  doctors: Number,
});

export default mongoose.models.Hospital || mongoose.model("Hospital", hospitalSchema);
