import { IPhoto } from "./photo";

export interface User {
  id: number;
  userName: string;
  knownAs: string;
  age: number;
  creasted: Date;
  lastActive: Date;
  gender: string;
  photoUrl: string;
  city: string;
  country: string;
  interests?: string;
  introduction?: string;
  lookingFor?: string;
  photos?: IPhoto[];
}
