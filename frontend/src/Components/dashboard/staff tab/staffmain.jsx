import { SquarePen, Trash2, UserCog } from 'lucide-react';
import { useState } from 'react';
import StaffTable from "./stafftable";
function Staff(){

  const [salary,setSalary]=useState(0);
  const [editSalary,setEditSalary]=useState(false);
  const [msg,setMsg]=useState("");
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);

  // Initial data
  const [staff, setStaff] = useState([
    { id: 1, name: "Ram Sharma", jobTitle: "Receptionist",  contact: "9872344678", salary:0 },
    { id: 2, name: "Sita Gurung", jobTitle: "Manager",  contact: "9862345478", salary:0 },
    { id: 3, name: "Hari Thapa", jobTitle: "Cleaner",contact: "9712343678", salary:0 },
  ]);

  // Stats
  const totalStaff = staff.length;
  const totalPayroll = staff.reduce(
    (sum, s) => sum + (s.salary || 0),
    0
  );

  const validateSalary = () => {
    if(!salary || salary<=0)
    {
      setMsg("Enter valid salary");
      return;
    }

    setStaff((prev) =>
      prev.map((s) =>
        s.id === selectedStaff.id
          ? { ...s, salary: Number(salary) }
          : s
    ));

    setEditSalary(false);
    setMsg("");
  }

  const handleDeleteStaff = (id) => {
    setStaff((prev) =>
      prev.filter((s) => s.id !== id)
    )
  }

return(
  <div className="flex-1 bg-gray-50 p-8 min-h-screen">
      
    {/* Header */}
    <div className="mb-6">
      <h1 className="text-xl md:text-2xl font-bold">
        Staff Management
      </h1>
      <p className="text-sm md:text-[15px] text-gray-400 font-medium mt-1">
        View and Manage all staffs and their payroll information
      </p>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-4 rounded-lg shadow-sm font-medium">
        <p className="text-gray-600 text-[17px] mb-2 ">Total Staff</p>
        <p className="text-gray-900 text-[17px]">{totalStaff}</p>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg shadow-sm font-medium">
        <p className="text-blue-700 text-[17px] mb-2">Monthly Payroll</p>
        <p className="text-blue-900 text-[17px]">Rs {totalPayroll.toLocaleString()}</p>
      </div>
    </div>

    {/* Staff Table */}
    <StaffTable
      staff={staff}
      setSelectedStaff={setSelectedStaff}
      setSalary={setSalary}
      setEditSalary={setEditSalary}
      setShowPopUp={setShowPopUp}
    />

    {editSalary && (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className='bg-white rounded-lg px-4 py-6 w-80 '>
          <p className='font-bold text-lg mb-6'>Assign Salary</p>
          <p className='font-medium mb-3'>New Salary:</p>
          <input 
            type="number"
            value={salary}
            className='w-full border rounded-lg p-2 mb-3'
            onChange={(e)=>setSalary(e.target.value)}
          />

          <p className='text-red-500 font-medium text-sm mb-4'>{msg}</p>

          <div className='flex items-center justify-between'>
            <button 
            onClick={()=>setEditSalary(false)}
            className="bg-red-400 rounded-xl text-white px-4 py-1.5 font-medium">
              Cancel
            </button>
            <button 
            onClick={validateSalary}
            className="bg-green-400 rounded-xl text-white px-4 py-1.5 font-medium">
              Confirm
            </button>
          </div>
        </div>
      </div>
    )}

    {showPopUp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-7 rounded-xl shadow-lg text-center w-100 flex flex-col items-center justify-center">
            <p className="font-medium text-lg mb-6">
              Do you want to remove {selectedStaff.name} from the system?
            </p>
            <div className='flex items-center justify-center gap-4'>
              <button
                onClick={() => setShowPopUp(false)}
                className="bg-slate-500 hover:bg-slate-600 text-white text-sm mt-1 font-medium px-4 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={() => {setShowPopUp(false);
                  handleDeleteStaff(selectedStaff.id);
                }}
                className="bg-red-500 hover:bg-red-600 text-white text-sm mt-1 font-medium px-4 py-2 rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
    )}

  </div>
)}
  
export default Staff