import { request } from '../utils/request';

export const removePostAsync = (id) => () =>
	request(`http://localhost:3001/posts/${id}`, 'DELETE');
