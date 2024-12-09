import { Schema, model } from "mongoose";

const titleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status:{
        type:Boolean,
        default:false,
    }
  },
  { timestamps: true }
);
const todoSchema = new Schema({
    userID:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    tasks:[titleSchema],
});


export const todoModel = model("Todo" , todoSchema);
