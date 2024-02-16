//import { useEffect ,useState } from 'react'
//import axios from 'axios';
import { Outlet } from "react-router-dom";
//import { connect } from 'react-redux';
//import {getDataUsers,setLogin} from '../../Actions/getDataUsers';
//import { useAuth } from "./Tools/useAuth";


const ProtectedLayout = () => {
  //const datausers = props.usersData;
  //const logindata = props.logindata;
	//const navigate = useNavigate();
	//const current = new Date();

	/*
	const UpdateData = async () => {
		try{
			const tokendata = localStorage.getItem('TokenData')
			const headers_data = {
					Authorization: tokendata,
				}
			var api='http://localhost:5000/ladokutu/index.php/Solution/cek_token';  
			const response = await axios({
					method: 'post',
					headers: headers_data,
					url: api,
				});
			
			if((response.data.status === 200 )){
				navigate("/tr/dashboard")
				console.log(response.data.status)
			}else {
				console.log("logout automatically ",current)
				alert(response.data.message)
				navigate("/")
				await localStorage.removeItem('TokenData')
			}
		}
		catch(e){
			navigate("/")
			console.log("logout",current)
		}
	}
	*/
	
  return (
    <div>
		<Outlet />
    </div>
  )
};

/*
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

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedLayout);
*/
export default ProtectedLayout