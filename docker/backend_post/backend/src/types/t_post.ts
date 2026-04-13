export interface t_Post {
  id: string;
  group_id: string | null; //+
  user_id: string;
  description: string | null; // Not Nullable in DB, but can be null when creating a post
  url_image: string | null; //+
}

export interface U_info {
  id: string,
  email: string,
  lastName: string,
  firstName: string,
  urlProfil: string,
  urlCover: string
}