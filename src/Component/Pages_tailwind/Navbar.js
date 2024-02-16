/* This example requires Tailwind CSS v2.0+ */
import { Fragment,useState,useEffect } from 'react'
import { useNavigate,Link  } from 'react-router-dom'
//import axios from 'axios'
import { Dialog,Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/outline'
import { useAuth } from "./Tools/useAuth";
import ModalTimeout from "./Tools/ModalTimeout";
import SideBar from "./Tools/SideBar";

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Data', href: '#', current: 'true' },
  { name: 'Reports', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Logout', href: '/logout' },
 
]



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const current = new Date();
	const auth = useAuth();
	
	useEffect(() => {
		//CheckData()
    },[]); 
	
	const CheckData = () => {
		auth.then(data => {

			if((data.status === 200 )){
				navigate("/tr/dashboard")
				//console.log(data)
			}else {
				console.log("logout automatically ",current)
				//alert(response.data.message)
				navigate("/")
				localStorage.removeItem('TokenData')
			}
		})
	}
  
   
  return (
    <>
	  
	  <ModalTimeout/>
	  <Transition.Root show={open} as={Fragment}>
		<Dialog as="div" className="relative z-10" onClose={setOpen}>
			<SideBar/>		
		</Dialog>
      </Transition.Root>
		

		<div className="min-h-full">
			<Disclosure as="nav" className="bg-blue-800/100">
				<>
				  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
					  <div className="flex items-center">
						<div className="flex-shrink-0">
							<MenuIcon className="block h-6 w-6 hover:bg-blue-900" aria-hidden="true"  onClick={() => setOpen(true)}/>
						</div>
						<div className="hidden md:block">
						  <div className="ml-10 flex items-baseline space-x-4">
							{navigation.map((item,index) => (
							  <a key={item.name}
								href={item.href}
								className={classNames(
								  item.current
									? 'bg-blue-900 text-white'
									: 'text-gray-300 hover:bg-blue-900 hover:text-white',
								  'px-3 py-2 rounded-md text-sm font-medium'
								)}
								aria-current={item.current ? 'page' : undefined}
							  >
								{item.name}
							  </a>
							))}
						  </div>
						</div>
					  </div>
					  <div className="hidden md:block">
						<div className="ml-4 flex items-center md:ml-6">
						  <button
							type="button"
							className="bg-gray-700 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
						  >
							<span className="sr-only">View notifications</span>
							<BellIcon className="h-6 w-6" aria-hidden="true" />
						  </button>
						  {/* Profile dropdown */}
						  <Menu as="div" className="ml-3 relative">
							<div>
							  <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
								<span className="sr-only">Open user menu</span>
								<img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
							  </Menu.Button>
							</div>
							<Transition
							  as={Fragment}
							  enter="transition ease-out duration-100"
							  enterFrom="transform opacity-0 scale-95"
							  enterTo="transform opacity-100 scale-100"
							  leave="transition ease-in duration-75"
							  leaveFrom="transform opacity-100 scale-100"
							  leaveTo="transform opacity-0 scale-95"
							>
							  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
								{userNavigation.map((item,index) => (
								  <Menu.Item key={item.name}>
									{({ active }) => (
									  <Link to={item.href}
										className={classNames(
										  active ? 'bg-gray-100' : '',
										  'block px-4 py-2 text-sm text-gray-700'
										)}
									  >
										{item.name}
									  </Link>
									)}
								  </Menu.Item>
								))}
							  </Menu.Items>
							</Transition>
						  </Menu>
						</div>
					  </div>
					</div>
				  </div>
				</>			
			</Disclosure>
		</div>
	  
		
    </>
  )
}
