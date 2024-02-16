/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Link  } from 'react-router-dom'
import { Dialog,Disclosure, Transition } from '@headlessui/react'
import DynamicHeroIcon from '../Icon'
import { XIcon } from '@heroicons/react/outline'



const sidebar = [
  { name: 'Dashboard', icon : 'HomeIcon' ,href: '/tr/dashboard', class: 'flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md' ,
	child: []
  },
  { name: 'Masters', icon : 'CogIcon' ,href: '#CogIcon', class: 'flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md' ,
	
	child: [
	{ name: 'Users', icon : 'TagIcon' ,href: '/tr/master_user', class: 'flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md' },
	{ name: 'Department', icon : 'TagIcon' ,href: '/tr/master_department', class: 'flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md' },
	{ name: 'Position', icon : 'TagIcon' ,href: '/tr/master_position', class: 'flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md' },
	]
  },
]

const menu_sidebar=sidebar.map((items,index) => (

		<Disclosure>
			<Disclosure.Button as={Fragment}>
				<Link to={items.href} class={items.class}>
						<DynamicHeroIcon icon={items.icon}  />
						<span class="font-medium">{items.name}</span>
				</Link>
			</Disclosure.Button >
					
		{items.child.map((item,index) => (
			<Disclosure.Panel className="px-10" >
				<Link to={item.href} class={item.class}>
					<DynamicHeroIcon icon='TagIcon' />
					<span class="mx-4 font-medium">{item.name}</span>
				</Link>
			</Disclosure.Panel>
		))}
		</Disclosure>
											
))
export default function SideBar() {
	
	
	return (
    <>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
		</Transition.Child>
		<div className="fixed inset-0 overflow-hidden">
			<div className="absolute inset-0 overflow-hidden">
				<div className="pointer-events-none fixed inset-y-0 left-0 flex">
				  <Transition.Child
					as={Fragment}
					enter="transform transition ease-in-out duration-500 sm:duration-700"
					enterFrom="-translate-x-full"
					enterTo="translate-x-0"
					leave="transform transition ease-in-out duration-500 sm:duration-700"
					leaveFrom="translate-x-0"
					leaveTo="-translate-x-full"
				  >
					<Dialog.Panel className="pointer-events-auto relative w-screen max-w-xs">
					  <div className="flex h-full flex-col bg-white py-6 shadow-xl">
						<div className="px-4 sm:px-6">
						  <Dialog.Title className="text-lg font-medium text-gray-900">Aksez Apps</Dialog.Title>
						</div>
						<div className="relative mt-4 flex-1 px-4 sm:px-6">
							<nav>{menu_sidebar}</nav>
						</div>
					  </div>
					</Dialog.Panel>
				  </Transition.Child>
				</div>
			</div>
		</div>
	</>
  )
}

