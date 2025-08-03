import { useStore } from 'react-redux';
import { useEffect } from 'react';

export const useResetForm = (reset) => {
	const store = useStore();
	useEffect(() => {
		let currentWasLogout = store.getState().app.wasLogout; // сброс формы при разлогировании
		return store.subscribe(() => {
			let prevWasLogout = store.getState().app.wasLogout;
			if (currentWasLogout !== prevWasLogout) {
				reset();
			}
		});
	}, [reset, store]);
};
