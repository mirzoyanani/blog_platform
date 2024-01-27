export interface UserInfoDTO {
  uid?: string;
  name: string;
  surname: string;
  email: string;
  password: string;
}
export interface LoginDto {
  email: string;
  password: string;
}
export interface ForgetPasswordDTO {
  email: string;
}
export interface CodeDTO {
  code: string;
}

export interface PasswordDTO {
  password: string;
}
