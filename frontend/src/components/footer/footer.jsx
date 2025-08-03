import { useEffect, useState } from 'react';
import { data } from 'react-router-dom';
import styled from 'styled-components';

//const FooterContainer = styled.div``
// fetch(
// 			'https://api.openweathermap.org/data/2.5/weather?q=Novokuznetsk&units=metric&lang=ru&appid=8a5a1b66bb40eb3841059525fe2f71a2',
//     		).then((data) => data.json()).then(console.log);
const FooterContainer = ({ className }) => {
	const [city, setCity] = useState('');
	const [temperature, setTemperature] = useState('');
	const [weather, setWeather] = useState('');

	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=Novokuznetsk&units=metric&lang=ru&appid=8a5a1b66bb40eb3841059525fe2f71a2',
		)
			.then((data) => data.json())
			.then(({ name, main, weather }) => {
				setCity(name);
				setTemperature(Math.round(main.temp));
				setWeather(weather[0].description);
			});
	}, []);
	return (
		<div className={className}>
			<div>
				<div>Блог веб разработчика</div>
				<div>web@developer.ru</div>
			</div>
			<div>
				<div>
					{city}{' '}
					{new Date().toLocaleDateString('ru', {
						day: 'numeric',
						month: 'long',
					})}
				</div>
				<div>
					{temperature}°C, {weather}
				</div>
			</div>
		</div>
	);
	//8a5a1b66bb40eb3841059525fe2f71a2
};

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 1000px;
	height: 120px;
	padding: 20px 40px;
	font-weight: bold;
	background-color: #fff;
	box-shadow: rgb(0, 0, 0) 0px 2px 17px;
`;
