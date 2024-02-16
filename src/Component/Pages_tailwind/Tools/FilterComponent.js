import React from "react";
import { XIcon,SearchIcon,DotsVerticalIcon,TrashIcon} from '@heroicons/react/outline'


const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <div class="border rounded overflow-hidden flex">
		<input type="text" class="px-4 py-2" placeholder="Search..." value={filterText} onChange={onFilter}/>
			<button class="flex items-center justify-center px-2 border-l focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40">
				<XIcon className="h-3 w-3 text-red-600" aria-hidden="true" onClick={onClear} />
			</button>
	</div>
   
  </>
);

export default FilterComponent;