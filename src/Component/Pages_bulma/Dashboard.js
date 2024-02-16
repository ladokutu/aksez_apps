/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
 
const Dashboard = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const history = useNavigate();
 
    useEffect(() => {
        CheckToken();
        getUsers();
    }, []);
 
    const CheckToken = async () => {
        var tokendata = await localStorage.getItem('TokenData')
		const headers_data = {
               Authorization: tokendata,
           }
        var api='http://localhost:5000/ladokutu/index.php/Aksez/cek_token';  
                const response = await axios({
                  method: 'post',
				  headers: headers_data,
                  url: api,
				});
		
		console.log(response.data)
		if(response.data.status=='401'){
				history("/")
		}
    }
 
    //const axiosJWT = axios.create();
	/*
    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
	*/
    const getUsers = async () => {
        try { 
			var tokendata = await localStorage.getItem('TokenData')
			const headers_data = {
                    Authorization: tokendata,
                }
            var api='http://localhost:5000/ladokutu/index.php/Aksez/data_attendance';  
                const response = await axios({
                  method: 'post',
				  headers: headers_data,
                  url: api,
                  data: {
						periode: '2022-06'
					}
				});
			setUsers(response.data);
			console.log(response.data)
			if(response.data.status=='401'){
				history("/")
			}
        } catch (error) {
            console.log(error)
        }
        
    }
 
    return (
        <div className="container mt-5">
            <h1>Welcome Back: {name}</h1>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
					{users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.tanggal}</td>
                            <td>{user.jam_masuk}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
 
export default Dashboard