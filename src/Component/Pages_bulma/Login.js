import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useNavigate();
	
	useEffect(() => {
        CheckToken();
    }, []);
	
	const CheckToken = async () => {
        var tokendata = await localStorage.getItem('TokenData')
		const headers_data = {
               Authorization: tokendata,
           }
        var api='http://localhost:5000/ladokutu/index.php/Aksez/cek_token';  
                const response = await axios({
                  method: 'get',
				  headers: headers_data,
                  url: api,
				});
		
		//console.log(response.data)
		//alert(response.data.status)
		if(response.data.status=='200'){
			history("/dashboard")
		}
    }
    const Auth = async (e) => {
        e.preventDefault();
		try { 
            var api='http://localhost:5000/ladokutu/index.php/Aksez/login_data';  
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
				history("/dashboard")
				localStorage.setItem('TokenData', response.data.token)
				console.log(response.data)
			}else{
				alert(response.data.message)
			}
        } catch (error) {
            console.log(error)
        }
    }
 
    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={Auth} className="box">
                                <p className="has-text-centered">{msg}</p>
                                <div className="field mt-5">
                                    <label className="label">Email or Username</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
 
export default Login