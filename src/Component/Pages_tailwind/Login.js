import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {getDataUsers,setLogin} from '../../Actions/getDataUsers';
import { useAuth } from "./Tools/useAuth";


const Login = (props) => {
	const navigate = useNavigate();
    const [email, setEmail] = useState('');
	
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
	const [flag, setFlag] = useState(false);
	const auth = useAuth();
	
	//const datausers = props.usersData;
	const logindata = props.logindata;
	const current = new Date();
	
	useEffect(() => {
		CheckData()
		props.getDataUsers();
    },[]); 
	
	const CheckData = () => {
		auth.then(data => {

			if((data.status === 200 )){
				navigate("/tr/dashboard")
				console.log(data)
			}else {
				console.log("logout automatically ",current)
				//alert(response.data.message)
				navigate("/")
				localStorage.removeItem('TokenData')
			}
		})
	}
	
    const Auth = async (e) => {
        e.preventDefault();
		try { 
            var api='https://panen.ladokutu.info/index.php/Solution/login_data';  
            const data = { 
                    'user_email': email,
					'user_password': password
                }
			const response = await axios({
                  method: 'post',
                  url: api,
                  data: data
				});
			if (response.data.status === 200 ) {
				props.setLogin(true)
				setMsg(response.data.message)
				setFlag(true)
				console.log(logindata)
				await localStorage.setItem('TokenData', response.data.token)	
				navigate("/tr/dashboard")
			}else{
				setMsg(response.data.message)
				setFlag(true)
			}
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div class="relative flex flex-col bg-gradient-to-r from-sky-500 to-indigo-500  justify-center min-h-screen overflow-hidden">
			<div class="w-full p-6 m-auto bg-white rounded shadow-lg ring-2 ring-blue-800/50 lg:max-w-md">
				<h1 class="text-3xl font-semibold text-center text-blue-800/60">Aksez Apps</h1>
				<form class="mt-6" onSubmit={Auth}>
					{flag &&
						<div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert" onClick={ () => setFlag(false) }>
						  <span class="font-medium" >{msg} !</span> 
						</div>
					}
					<div>
						<label for="email" class="block text-sm text-gray-800">Email</label>
						<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" class="block w-full px-4 py-2 mt-2 text-blue-800 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-800 focus:outline-none focus:ring focus:ring-opacity-40" />
					</div>
					<div class="mt-4">
						<div>
							<label for="password" class="block text-sm text-gray-800">Password</label>
							<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} class="block w-full px-4 py-2 mt-2 text-blue-800 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
						</div>
						<Link to="#" class="text-xs text-gray-600 hover:underline">Forget Password?</Link>
						<div class="mt-6">
							<button class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500/60 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-600">
								Login
							</button>
						</div>
					</div>	
				</form>
			</div>
		</div>
    )
}
 const mapStateToProps = (state) => {
  const {usersData,logindata} = state;
  return {
    usersData: usersData,
	logindata:logindata
  };
};

const mapDispatchToProps = (dispatch) => ({
  getDataUsers: () => dispatch(getDataUsers()),
  setLogin: (value) => dispatch(setLogin(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
//export default Login