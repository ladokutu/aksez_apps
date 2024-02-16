/* This example requires Tailwind CSS v2.0+ */
import { Fragment,useEffect,useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "./Tools/useAuth";


function Dashboard() {

	const navigate = useNavigate();
	const current = new Date();
	const auth = useAuth();
	
	
	
	useEffect(() => {
		CheckData()
    },[]); 
	
	const CheckData = () => {
		auth.then(data => {
			if((data.status === 200 )){
				navigate("/tr/dashboard")
				console.log(data)
			}else {
				console.log("logout automatically ",current)
				alert(data.message)
				navigate("/")
				localStorage.removeItem('TokenData')
			}
		})
	}
	
	
	
  return (
    <>
       <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
			<header className="bg-white">
			  <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
				<h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
			  </div>
			</header>
            {/* Replace with your content */}
            <div className="px-4 py-6 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
            </div>
            {/* /End replace */}
          </div>
        </main>
    </>
  )
}
export default Dashboard