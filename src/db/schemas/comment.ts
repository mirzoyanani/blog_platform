import mongoose, { Schema, Document } from "mongoose";

interface commentDocument extends Document {
  uid: string;
  body: string;
}

const commentSchema: Schema<commentDocument> = new Schema({
  uid: {
    type: String,
  },
  body: {
    type: String,
  },
});

const CommentModel = mongoose.model<commentDocument>("Comment", commentSchema);

export default CommentModel;
