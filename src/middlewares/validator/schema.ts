import joi from "joi";

export interface ValidationSchemas {
  [key: string]: joi.Schema;
}

const validationSchemas: ValidationSchemas = {
  register: joi.object({
    name: joi.string().required(),
    surname: joi.string().required(),
    email: joi.string().email().lowercase().required(),
    password: joi.string().min(8).max(16).required(),
  }),
  reset_password: joi.object({
    password: joi.string().min(8).max(16).required(),
  }),
  login: joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
  }),
  forget_password: joi.object({
    email: joi.string().required(),
  }),
  check_code: joi.object({
    code: joi.string().required(),
  }),
  blog: joi.object({
    title: joi.string().required(),
    body: joi.string().required(),
  }),
  update: joi.object({
    id: joi.string().required(),
  }),
  comment: joi.object({
    blogId: joi.string().required(),
    body: joi.string().required(),
  }),
  get_comment: joi.object({
    id: joi.string().required(),
  }),
};

export default validationSchemas;
