type ErrorMessage = { code: number; message: string; status: number };

export const _WRONG_PARAMS_: ErrorMessage = { code: 4060, message: "Invalid parameters", status: 406 };

export const _VALIDATION_ERROR_: ErrorMessage = { code: 4061, message: "Validation failure", status: 406 };
export const _WRONG_LOGIN_OR_PASSWORD: ErrorMessage = {
  code: 4010,
  message: "Incorrect username or password",
  status: 401,
};
export const _NOT_AVAILABLE_TO_USER_: ErrorMessage = { code: 4031, message: "User not available", status: 403 };
export const _TOKEN_IS_WRONG_: ErrorMessage = { code: 4030, message: "Validation failure", status: 403 };
export const _RESET_CODE_IS_WRONG_: ErrorMessage = {
  code: 4062,
  message: "The verification code is incorrect",
  status: 406,
};
export const _USER_NOT_FOUND_: ErrorMessage = {
  code: 4041,
  message: "No such user exists",
  status: 404,
};
export const _TOKEN_IS_MISSING_: ErrorMessage = {
  code: 4041,
  message: "Token is missing",
  status: 404,
};
export const _EMAIL_EXISTS_: ErrorMessage = {
  code: 4041,
  message: "Email is already in use",
  status: 404,
};
export const _USER_DOES_NOT_HAVE_ACCESS_: ErrorMessage = {
  code: 4032,
  message: "User has no rights",
  status: 403,
};
export const _CANT_SEND_MAIL_: ErrorMessage = {
  code: 1444,
  message: "The email was not sent successfully",
  status: 500,
};
export const _TECHNICAL_DIFFICULTIES_: ErrorMessage = { code: 5000, message: "Technical Difficulties", status: 500 };
