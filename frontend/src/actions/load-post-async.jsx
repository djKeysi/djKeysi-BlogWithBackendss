import { request } from '../utils';
import { setPostData } from './set-post-data';

export const loadPostAsync = (postId) => (dispatch) =>
	request(`http://localhost:3001/posts/${postId}`).then((postData) => {
		if (postData.data) {
			dispatch(setPostData(postData.data));
		}
		return postData;
	});
