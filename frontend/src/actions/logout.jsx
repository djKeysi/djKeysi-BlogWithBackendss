import { request } from '../utils';
import { ACTION_TYPE } from './action-type';

export const logout = () => {
	request('http://localhost:3001/logout', 'POST');
	return {
		type: ACTION_TYPE.LOGOUT,
	};
};
