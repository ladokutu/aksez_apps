import * as React from 'react';
import { Home,LocationCity,Padding,Tune,PersonPinCircle,RunCircle,Reorder,PlaylistAddCheck,PlaylistAdd,MonetizationOn,PersonSearch,Person,Badge,ContactPage,Business,AccountBox,InsertInvitation,CalendarMonth,EventAvailable} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux';
import {setDrawer} from '../../../Actions/getDataButton';
import { Avatar,List,Box,Drawer,ListItemIcon,ListItemText,ListItemButton,ListItem,Divider   } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import ModalTimeout from "./ModalTimeout";
import { styled, alpha,makeStylesmakeStyles } from '@mui/material/styles';


const TemporaryDrawer = (props) => {
  
  const { setDrawer,drawer } = props;
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
 
  const handleDrawerClose = () => {
    setDrawer(false);
  };
  
  const sidebar = [
	  { name: 'Dashboard', icon : <Home/> ,link: '/ds/home', id: 1 ,
		child: []
	  },
	  
	  { name: 'My Info', icon : <AccountBox/> ,link: '#', id: 2 ,
		
		child: [
			{ name: 'Attendance', icon : <CalendarMonth/> ,link: '/my/attendance', id:21 },
			{ name: 'Request Form', icon : <InsertInvitation/> ,link: '/my/request_form', id:22 },
			{ name: 'Approval Form', icon : <EventAvailable/> ,link: '/my/approval_form', id:23 },
		]
	  },
	  
	  { name: 'Masters', icon : <Tune/> ,link: '#', id: 7 ,
		
		child: [
			{ name: 'Users', icon : <Person/> ,link: '/ms/master_user', id:71 },
			{ name: 'Department', icon : <Badge/> ,link: '/ms/master_department', id:72 },
			{ name: 'Position', icon : <ContactPage/> ,link: '/ms/master_position', id:73 },
			{ name: 'Workplace', icon : <Business/> ,link: '/ms/master_workplace', id:74 },
		]
	  },
	  
	]	
	const handleClick = (items)  => {
		open[items.id]===true ? setOpen({ [items.id]: false }) : setOpen({ [items.id]: true })
	}
   const menu_sidebar=sidebar.map((items,index) =>{
		
		return(
		<>
			<ListItem key={items.id} disablePadding>
				<ListItemButton onClick={ items.child.length===0 ? () => NavTo(items.link) : () => handleClick(items) }  >
					<ListItemIcon>
						{items.icon}
					</ListItemIcon>
					<ListItemText primary={items.name} />
				</ListItemButton>
			</ListItem>
			<Collapse in={open[items.id]} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{items.child.map((item,index) => (
						<ListItem key={item.id} disablePadding>
							<ListItemButton onClick={() => NavTo(item.link)} sx={{ pl: 4 }}>
								<ListItemIcon>
									{item.icon}
								</ListItemIcon>
							<ListItemText primary={item.name} />
							</ListItemButton>
						</ListItem>
					))} 
				</List>
			</Collapse>
		</>
		);
	  }
	)
	
   const NavTo = (link) => {
		navigate(link)
		setDrawer(false)
	}
  
	
  return (
  
    <div>
	<ModalTimeout/>
	<Box sx={{
			marginTop: 10,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			
		}}>
      
        <React.Fragment key={'left'}>
          
          <Drawer
            anchor='left'
            open={drawer}
            onClose={handleDrawerClose}
			PaperProps={{
				sx: {
				  backgroundColor: "LemonChiffon"
				}
			  }}
			
          >
            <Box
			  sx={{ width: 250  }}
			  role="presentation"
			>
				<List>
					<ListItem  >
						<ListItemIcon>
							<Avatar alt="Aksez" src="https://play-lh.googleusercontent.com/7n86QnflUFEfo6W0k_VjnGOeXScHo9lRgCXaJ9yA3WWyZ9E6hIYdX_AJQ5OUJ03VevIL=w240-h480-rw" />
						</ListItemIcon>
						<ListItemText primary="Aksez Apps"/>
					</ListItem>
					<Divider />
					{menu_sidebar} 
				</List>
			</Box>
          </Drawer>
        </React.Fragment>
     
	</Box>
    </div>
  );
}
const mapStateToProps = (state) => {
  const {drawer} = state;
  return {
	drawer:drawer
  };
};

const mapDispatchToProps = (dispatch) => ({
  setDrawer: (value) => dispatch(setDrawer(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TemporaryDrawer);
//export default TemporaryDrawer