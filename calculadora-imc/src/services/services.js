import axios from "axios";

export const postResult = (result) => {
	const url = `${process.env.REACT_APP_API_URL}/calculators`;
	return axios({
		method: 'post',
		url,
		data: { result },
	});
};

export const getResults = () => {
	const url = `${process.env.REACT_APP_API_URL}/calculators`;
	return axios({
		method: 'get',
		url,
	});
};