import { UserType } from "./UserType";

export interface AuthType {
  //accessToken e user são campos retornados no login
  accessToken: string;
  user: UserType;
}
