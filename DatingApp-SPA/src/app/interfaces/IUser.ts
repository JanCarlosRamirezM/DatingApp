import { IPhoto } from "./IPhoto";

export interface IUser {
  userName: string;
  knownAs: string;
  age: number;
  creasted: Date;
  lastActive: Date;
  gender: string;
  photoUrl: string;
  city: string;
  country: string;
  id?: number;
  interests?: string;
  introduction?: string;
  lookingFor?: string;
  photos?: IPhoto[];
}
