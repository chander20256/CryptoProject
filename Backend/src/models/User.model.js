import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    // ✅ ACTIVITY TRACKING
    isOnline: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
    },
    lastLogout: {
      type: Date,
    },
    lastActive: {
      type: Date,
    },
    points: {
  type: Number,
  default: 0
},
balance: {
  type: Number,
  default: 0
}
  },
  { timestamps: true } // createdAt = signup date
);

export default mongoose.model("User", userSchema);
