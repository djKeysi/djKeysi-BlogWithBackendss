import { request } from '../utils/request';
import { addComment } from './add-comment';

export const addCommentAsync = (postId, content) => (dispatch) => {
	request(`/posts/${postId}/comments`, 'POST', { content }).then((comment) => {
		//console.log(comment.data);

		//console.log(addComment(content));

		dispatch(addComment(comment.data));
	});
};
