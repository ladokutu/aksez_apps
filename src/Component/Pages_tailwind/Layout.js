//import { useEffect} from 'react'
//import axios from 'axios';
import { Outlet } from "react-router-dom";
//import { connect } from 'react-redux';
//import {getDataUsers,setLogin} from '../../Actions/getDataUsers';

const Layout = () => {
  //const datausers = props.usersData;
  //const logindata = props.logindata;
  //const navigate = useNavigate();
  //const current = new Date();
	
  return (
    <div>
		<Outlet />
    </div>
  )
};


export default Layout