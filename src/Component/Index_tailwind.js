import {BrowserRouter, Routes, Route } from "react-router-dom";
import { Fragment } from 'react'
//import axios from 'axios';
import Layout from "./Pages_tailwind/Layout";
import NoPage from "./Pages_tailwind/NoPage";

import Login from "./Pages_tailwind/Login";
import Logout from "./Pages_tailwind/Tools/Logout";
import Navbar from "./Pages_tailwind/Navbar";
import Footer from "./Pages_tailwind/Tools/Footer";



import ProtectedLayout from "./Pages_tailwind/Protected";
import HomePage from "./Pages_tailwind/Home";


import Dashboard from "./Pages_tailwind/Dashboard";
import Users from "./Pages_tailwind/Master/Users";
import Position from "./Pages_tailwind/Master/Position";
import Department from "./Pages_tailwind/Master/Department";

import { connect } from 'react-redux';
import {getDataUsers,setLogin} from '../Actions/getDataUsers';


const Index = (props) => {
	
    //const datausers = props.usersData;
	//const logindata = props.logindata;
	//const current = new Date();
	
	/*useEffect(() => {
        //UpdateData(); 
		//props.getDataUsers();
    }, []); 
	*/
	/*
	const UpdateData = async () => {
		try{
			const tokendata = await localStorage.getItem('TokenData')
			const headers_data = {
					Authorization: tokendata,
				}
			var api='http://localhost:5000/ladokutu/index.php/Solution/cek_token';  
			const response = await axios({
					method: 'post',
					headers: headers_data,
					url: api,
				});
			if((response.status==='200')){
				
				console.log("login")
			}else {
				console.log("logout",current)
				await localStorage.removeItem('TokenData')
				
			}
		}
		catch(e){
			console.log("logout",current)
		}
    }
	*/
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Login />}/>
					<Route path="login" element={<Login />}/>
					<Route path="logout" element={<Logout />}/>
					<Route path="homes" element={<HomePage />} />
					<Route path="*" element={<NoPage/>}/>
				</Route>
				
				<Route path="/tr" element={<ProtectedLayout />}>
					<Route path="dashboard" element={<><Navbar/><Dashboard/><Footer/></>}/>
					<Route path="master_user" element={<><Navbar/><Users/><Footer/></>}/>
					<Route path="master_position" element={<><Navbar/><Position/><Footer/></>}/>
					<Route path="master_department" element={<><Navbar/><Department/><Footer/></>}/>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
const mapStateToProps = (state) => {
  const {usersData,logindata} = state;
  return {
    usersData: usersData,
	logindata: logindata
  };
};

const mapDispatchToProps = (dispatch) => ({
  getDataUsers: () => dispatch(getDataUsers()),
  setLogin: (value) => dispatch(setLogin(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Index);
//export default Index