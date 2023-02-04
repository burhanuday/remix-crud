export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export const apiFetch = async <T>(
  path: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch("https://jsonplaceholder.typicode.com" + path, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    ...options,
  });
  return response.json();
};

export const getAllPosts = async (): Promise<Post[]> => {
  return apiFetch<Post[]>("/posts");
};

export const getOnePost = async (postId: number): Promise<Post> => {
  return apiFetch<Post>("/posts/" + postId);
};

export const createPost = async (post: Post): Promise<Post> => {
  return apiFetch<Post>("/posts", {
    method: "POST",
    body: JSON.stringify(post),
  });
};
