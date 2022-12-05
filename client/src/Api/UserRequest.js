import axios from 'axios'

const API = axios.create({ baseURL: "" })

export const getUser = (userId) => API.get(`/user/${userId}`)

export const updateUser = (id,FormData) => API.put(`user/${id}` , FormData);

export const getAllUser = () => API.get('/user');

export const followUser = (id , data) => API.put(`/user/${id}/follow`,data)
export const unFollowUser=(id , data) =>API.put(`/user/${id}/unfollow`,data);