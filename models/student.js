import mongoose from "mongoose"

const stuentSchema = mongoose.Schema({
    name: String,
    age: Number,
    gender: String
  })

  const Student = mongoose.model("students",
    stuentSchema)

export default Student