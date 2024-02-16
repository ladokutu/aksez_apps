import axios from 'axios';
import React,{ Fragment, useRef, useState,useEffect,useMemo,useCallback } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon,SearchIcon,DotsVerticalIcon,TrashIcon} from '@heroicons/react/outline'
import DataTable from 'react-data-table-component';
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FilterComponent from "../Tools/FilterComponent";


const Department = () => {
	
	const [datauser, setDataUser] = useState([]);
	
	const [filterText, setFilterText] = useState("");
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
	
	const [open, setOpen] = useState(false)
	
	const cancelButtonRef = useRef(null)
	
	const [selectedRows, setSelectedRows] = useState([]);
	const [toggleCleared, setToggleCleared] = useState(false);
	const [toggledClearRows, setToggleClearRows] = useState(false);
	
	
	const [id_depart, setIDDepart] = useState('');
	const [department, setDepartment] = useState('');
	
	
	
	
	
	const [selectedid, setSelectedid] = useState([]);
	
	
	const classinput = "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
	const columns = [
		{
			name: 'Code Dept',
			selector: row => row.id_depart,
			sortable: true,
		},
		{
			name: 'Department',
			selector: row => row.department,
			sortable: true,
		},
		{	
			cell: () => <button  onClick={handleButtonClick} className="rounded-md  px-1 py-3  border border-gray-300 shadow-sm bg-white text-base font-medium text-gray-700 hover:bg-gray-50" ><DotsVerticalIcon className="h-3 w-3 text-black-600" aria-hidden="true" /></button>,
			ignoreRowClick: true,
			allowOverflow: true,
			button: true,
		},
	];
	
	useEffect(() => {
		GetData()
    },[]); 
	
	
	const GetData = async () => {
		try {
			const tokendata = await localStorage.getItem('TokenData')
			const headers_data = {
				Authorization: tokendata,
			}
			var api='https://panen.ladokutu.info/index.php/Solution/data_master_department';  
			const response = await axios({
				method: 'post',
				headers: headers_data,
				url: api,
			});
			setDataUser(response.data)
			
		} catch (e) {
			console.log(e)
		}
	}
	
	
	
	const handleButtonClick = () => {
		console.log('clicked');
	};
	const handleChange = ({ selectedRows }) => {
		setSelectedRows(selectedRows);
	  };

	  // Toggle the state so React Data Table changes to clearSelectedRows are triggered
	  const handleClearRows = () => {
		setToggleClearRows(!toggledClearRows);
	  }
	
	const contextActions = useMemo(  () => {
		const handleDelete = () => {
			//console.log(selectedRows.map(r => r.id))	
			const dataid=selectedRows.map(r => r.id)
			//setSelectedid(dataid)
			deleteselected(dataid)
			/*
				for ( var i = dataid.length - 1; i >= 0; i--) {	
					deletebyid(dataid[i])
				}
			*/
		};
		return (
			<button key="delete" onClick={handleDelete} 
			className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
				<TrashIcon className="h-6 w-6 text-white-600" aria-hidden="true" />
			</button>
		);
	}, [datauser, selectedRows,toggleCleared]);
	
	
	
	const deleteselected = async (selectedid) => {
		
			try {
				const tokendata = await localStorage.getItem('TokenData')
				const headers_data = {
					Authorization: tokendata,
				}
				var api='https://panen.ladokutu.info/index.php/Solution/delete_selected_data_master_department';  
				const response = await axios({
					method: 'post',
					headers: headers_data,
					url: api,
					data: selectedid 
				});
				GetData()
				handleClearRows()
				console.log(selectedid)
			} catch (e) {
				console.log(e)
			}
	};
	
	
	const ClearForm =  () => {
		setOpen(false)
		setIDDepart('')
		setDepartment('')
		
	}
	
	
	const SimpanData = async (e) => {
        e.preventDefault();
		const tokendata = await localStorage.getItem('TokenData')
		const headers_data = {
			Authorization: tokendata,
		}
		
		try { 
            var api='https://panen.ladokutu.info/index.php/Solution/add_data_master_department';  
            const data_body = { 
                    'id_depart': id_depart,
					'department': department,
					
                }
			const response = await axios({
                  method: 'post',
                  url: api,
				  headers: headers_data,
                  data: data_body
				});
			console.log(response.data)
			if (response.data.status === 200 ) {
				console.log(response.data.message)
				GetData()
				ClearForm()
				setOpen(false)
				e.current.reset(); 
				
			}else{
				console.log(response.data)
			}
        } catch (error) {
            console.log(error)
        }
    }
	
	
	  const filteredItems = datauser.filter(
		item =>
		  JSON.stringify(item)
			.toLowerCase()
			.indexOf(filterText.toLowerCase()) !== -1
	  );

	  const subHeaderComponent = useMemo(() => {
		const handleClear = () => {
		  if (filterText) {
			setResetPaginationToggle(!resetPaginationToggle);
			setFilterText("");
		  }
		};

		return (
		  <FilterComponent
			onFilter={e => setFilterText(e.target.value)}
			onClear={handleClear}
			filterText={filterText}
		  />
		);
	  }, [filterText, resetPaginationToggle]);
	  
	  
	return(
			<div>
				<main>
					
				  <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					<header className="bg-white">
						  <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
							<h1 className="text-3xl font-bold text-gray-900">Master Department</h1>
						  </div>
					</header>
					
					<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
						<button onClick={() => setOpen(true)} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
						Add Data
						</button>
					 </div>
					<div className="px-4 py-6 sm:px-0">	  
						<div className="border-4 border-dashed border-gray-200 rounded-lg h-200" >
								
								<DataTable
									title="Department List"
									columns={columns}
									data={filteredItems}
									subHeader 
									responsive
									striped
									subHeaderComponent={subHeaderComponent}
									contextActions={contextActions}
									onSelectedRowsChange={handleChange}
									clearSelectedRows={toggledClearRows}
									selectableRows
									pagination 
								/>
						</div>
					</div>
					
				  </div>
				  
	<Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto ">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              
			  <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-2xl l:w-full">
				
				<div className="bg-gray-50 px-4 sm:px-6 sm:flex sm:flex-row justify-between">
					
					<div className="mt-3 text-left sm:mt-0 sm:ml-4 sm:text-left flex items-center justify-center">
						<Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900"> Add Data </Dialog.Title>
					</div>
					
					<button 
					onClick={() => setOpen(false)}
					className="bg-gray-50 mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
						<XIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
					</button>
					
				</div>
				
				<form class="mt-6"   onSubmit={SimpanData}>
				<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
					<div className="sm:flex sm:items-start">
				  
							
								<div className="grid grid-cols-8 gap-8">
								  
									<div className="col-span-8">
									  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
										Department Code 
									  </label>
									  <input required
										type="text" value={id_depart} onChange={(e) => setIDDepart(e.target.value)} 
										name="id_depart"
										id="id_depart"
										className={classinput}
									  />
									</div>

									

									<div className="col-span-8">
									  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
										Department Name
									  </label>
									  <input 
										type="text" value={department} onChange={(e) => setDepartment(e.target.value)} 
										name="department"
										id="department"
										className={classinput}
									  />
									</div>
									
								</div>
                  </div>
                </div>
				
				
				
				
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row justify-end">
                 
				   <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => ClearForm()}
                    ref={cancelButtonRef}
                  >Cancel
                  </button>
				  <button
                    type="button" type='submit'
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >Save
                  </button>
				  
                </div>
				</form>
				
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>		  
				  
	
				  
				</main>
			</div>

	)
}

export default Department