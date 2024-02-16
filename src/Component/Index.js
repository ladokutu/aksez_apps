import {BrowserRouter, Routes, Route } from "react-router-dom";

import React, { Fragment,useState,useEffect } from 'react';
import Layout from "./Pages_mui/Layout";
import ProtectedLayout from "./Pages_mui/Protected";

import SignIn from "./Pages_mui/SignIn";
import SignOut from "./Pages_mui/Tools/SignOut";
import NoPage from "./Pages_mui/NoPage";
import Drawer from "./Pages_mui/Tools/Drawer";
import AppBar from "./Pages_mui/Tools/AppBar";
import Footer from "./Pages_mui/Tools/Footer";
import { useAuth } from "./Pages_mui/Tools/useAuth";

import Content from "./Pages_mui/Dashboard/Content";



import User from "./Pages_mui/Master/User";
import Department from "./Pages_mui/Master/Department";
import Position from "./Pages_mui/Master/Position";
import Workplace from "./Pages_mui/Master/Workplace";
import Location from "./Pages_mui/Master/WorkplaceRelation/Location";
import Family from "./Pages_mui/Master/UserRelation/Family";

import Attendance from "./Pages_mui/My/Attendance";
import RequestForm from "./Pages_mui/My/RequestForm";
import ApprovalForm from "./Pages_mui/My/ApprovalForm";

import { connect } from 'react-redux';
import {getDataUsers,setLogin} from '../Actions/getDataUsers';
//import { useCookies } from 'react-cookie';

const Index = (props) => {
	const auth = useAuth();
	//const current = new Date();
	const [isLoggedIn, setisLoggedIn] = useState(null);
	const { logindata } = props;
	
	useEffect(() => {
		CheckData()
		props.getDataUsers()
    },[]); 
	const CheckData = () => {
		auth.then(data => {
			if((data.status === 200 )){
				setisLoggedIn(true)
			}else {
				setisLoggedIn(false)
			}
		})
	}
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<><SignIn /><Footer/></>}/>
					<Route path="signout" element={<SignOut/>}/>
					<Route path="*" element={<NoPage/>}/>
				</Route>
				
				{ logindata ||  isLoggedIn ?
				<>
				<Route path="/ds" element={<ProtectedLayout />}>
					<Route path="home" element={<><AppBar /><Drawer /><Content/><Footer/></>}/>

				</Route>
				
				<Route path="/my" element={<ProtectedLayout />}>
					<Route path="attendance" element={<><AppBar /><Drawer /><Attendance/><Footer/></>}/>
					<Route path="request_form" element={<><AppBar /><Drawer /><RequestForm/><Footer/></>}/>
					<Route path="approval_form" element={<><AppBar /><Drawer /><ApprovalForm/><Footer/></>}/>

				</Route>
				<Route path="/ms" element={<ProtectedLayout />}>
					<Route path="dashboard" element={<><AppBar /><Drawer /><Content/><Footer/></>}/>
					<Route path="master_user" element={<><AppBar /><Drawer /><User/><Footer/></>}/>
					<Route path="master_department" element={<><AppBar /><Drawer /><Department/><Footer/></>}/>
					<Route path="master_position" element={<><AppBar /><Drawer /><Position/><Footer/></>}/>
					<Route path="master_workplace" element={<><AppBar /><Drawer /><Workplace/><Footer/></>}/>
					
					<Route path="user_family" element={<><AppBar /><Drawer /><Family/><Footer/></>}/>
					<Route path="workplace_location" element={<><AppBar /><Drawer /><Location/><Footer/></>}/>
				</Route>
				</>	: <Route/>
				}
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