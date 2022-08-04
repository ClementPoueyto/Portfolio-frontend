import { Contact } from "./contact.models";
import { Link } from "./link.models";

export interface Profile {
  id: number;
  firstname: string;
  lastname : string;
  status : string;
  description: string;
  birthDate: Date;
  contact : Contact;
  github: Link;
  linkedin: Link

}
