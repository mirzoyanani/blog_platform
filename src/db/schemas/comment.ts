import mongoose, { Schema, Document } from "mongoose";

interface commentDocument extends Document {
  id: string;
  blogId: string;
  uid: string;
  body: string;
}

const commentSchema: Schema<commentDocument> = new Schema({
  id: {
    type: String,
  },
  blogId: {
    type: String,
  },
  uid: {
    type: String,
  },
  body: {
    type: String,
  },
});

const CommentModel = mongoose.model<commentDocument>("Comment", commentSchema);

export default CommentModel;
