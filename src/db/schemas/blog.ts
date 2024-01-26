import mongoose, { Schema, Document } from "mongoose";

interface BlogDocument extends Document {
  id: string;
  uid: string;
  title: string;
  body: string;
  author: string;
  creation_date: Date;
  update_date: Date;
}

const blogSchema: Schema<BlogDocument> = new Schema({
  id: {
    type: String,
  },
  uid: {
    type: String,
  },
  title: {
    type: String,
    maxlength: 32,
  },
  body: {
    type: String,
    maxlength: 500,
  },
  author: {
    name: String,
    surname: String,
  },
  creation_date: {
    type: Date,
    default: () => Date.now(),
  },
  update_date: {
    type: Date,
    default: () => Date.now(),
  },
});

const BlogModel = mongoose.model<BlogDocument>("Blog", blogSchema);

export default BlogModel;
