import axios from 'axios';

// Define interfaces for our data types
export interface Post {
  userId: number;
  id?: number;
  title: string;
  body: string;
}

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

export const getPosts = () => {
  return api.get<Post[]>('/posts');
};

export const createPost = (data: Post) => {
  return api.post<Post>('/posts', data);
};

export default api;