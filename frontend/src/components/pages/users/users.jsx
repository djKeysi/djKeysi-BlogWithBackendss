import { H2, PrivateContent } from '../../../components';
import { TableRow, UserRow } from './components';
import styled from 'styled-components';

import { useEffect, useState } from 'react';
import { ROLE } from '../../../constants';
import { checkAccess, request } from '../../../utils';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../../selectors';

export const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
	const userRole = useSelector(selectUserRole);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}
		Promise.all([
			request('http://localhost:3001/users'),
			request('http://localhost:3001/users/roles'),
		]).then(([usersRes, rolesRes]) => {
			if (usersRes.error || rolesRes.error) {
				setErrorMessage(usersRes.error || rolesRes.error);
				return;
			}

			setUsers(usersRes.data);
			setRoles(rolesRes.data);
		});

		// requestServer('fetchRoles').then(({ rolesError, res }) => {
		// 	if (rolesError) return;
		// 	setRoles(res);
		// });
		// requestServer('fetchUsers');
	}, [shouldUpdateUserList, userRole]);

	const onUserRemove = (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}
		request(`http://localhost:3001/users/${userId}`, 'DELETE').then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList);
		});
	};

	return (
		<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
			<div className={className}>
				{/* {errorMessage} ?
			<div>
				<H2>Ошибка</H2>
				<div>{errorMessage}</div>
			</div> */}
				<H2>Пользователи</H2>
				<div>
					<TableRow>
						<div className="login-column">Логин</div>
						<div className="registered-at-column">Дата регистрации</div>
						<div className="role-column">Роль</div>
					</TableRow>
					{users.map(({ id, login, registredAt, roleId }) => (
						<UserRow
							key={id}
							id={id}
							login={login}
							registredAt={registredAt}
							roleId={roleId}
							roles={roles.filter(
								({ id: roleId }) => roleId !== ROLE.GUEST,
							)}
							onUserRemove={() => onUserRemove(id)}
						/>
					))}
				</div>
			</div>
		</PrivateContent>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
	width: 570px;
`;
