import axios from 'axios';
import { useState } from "react";

export const useAuth =  () => {

	const [auth, setAuth] = useState( async () => {

		try {
			const tokendata = await localStorage.getItem('TokenData')
			const headers_data = {
				Authorization: tokendata,
			}
			var api='https://panen.ladokutu.info/index.php/Solution/cek_token';  
			const response = await axios({
				method: 'post',
				headers: headers_data,
				url: api,
			});
			return response.data
		} catch (e) {
			return e
		}
	});
	return auth
}


 