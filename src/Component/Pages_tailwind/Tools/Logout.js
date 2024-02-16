import { useEffect,useState} from 'react'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import LoadingOverlay from 'react-loading-overlay';
import { setLogin } from '../../../Actions/getDataUsers';

const Logout = (props) => {
	const navigate = useNavigate();
	const [isActive, setActive] = useState(true);
	useEffect(() => {
		Action();
    },[]);  
	
	
	const Action = async () => {
		try {
			await localStorage.removeItem('TokenData')
			props.setLogin(false)
			//console.log('Logout Success')
			alert('Logout Success')
			setActive(false)
			navigate("/")
		} catch (error) {
			console.log(error)
			setActive(false)
		}
    }
	
	return (
        <div className='bg-slate-400 flex items-center justify-center h-screen'>
			<LoadingOverlay
				active={isActive}
				spinner
				text='Loading...'
			/>
		</div>
    )
}
const mapStateToProps = (state) => {
  const {logindata} = state;
  return {
	logindata: logindata
  };
};

const mapDispatchToProps = (dispatch) => ({
  setLogin: (value) => dispatch(setLogin(value)),
});
export default connect(mapStateToProps,mapDispatchToProps)(Logout);