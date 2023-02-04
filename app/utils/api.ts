export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export const apiFetch = async <T>(path: string): Promise<T> => {
  const response = await fetch("https://jsonplaceholder.typicode.com" + path);
  return response.json();
};

export const getAllPosts = async (): Promise<Post[]> => {
  return apiFetch<Post[]>("/posts");
};

export const getOnePost = async (postId: number): Promise<Post> => {
  return apiFetch<Post>("/posts/" + postId);
};
