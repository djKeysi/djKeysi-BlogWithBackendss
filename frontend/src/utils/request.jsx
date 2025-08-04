// функция для того чтобы общатся с бекендом

export function request(url, method, data) {
	return fetch(url, {
		headers: {
			'content-type': 'application/json',
		},
		method: method || 'GET',
		credentials: 'include',
		body: data ? JSON.stringify(data) : undefined,
	}).then((res) => res.json());
}
