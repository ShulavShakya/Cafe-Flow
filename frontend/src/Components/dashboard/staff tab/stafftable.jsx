import { SquarePen, Trash2, UserCog } from "lucide-react";

function StaffTable({
  staff,
  setSelectedStaff,
  setSalary,
  setEditSalary,
  setShowPopUp,
}) 
{
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center gap-2">
        <UserCog className="w-4.5 h-4.5 md:w-5 md:h-5 text-red-500" />
        <h3  className="font-bold text-[17px] md:text-[19px]">
          Staff Information
        </h3>
      </div>

      <div className="w-full overflow-x-auto">
      {staff.length === 0 ? (
        <div className='text-gray-500 font-medium text-center text-lg p-4 mb-3'>
                No staff information to show.
            </div>
      ) : (
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-gray-600 font-medium text-[15px]">
                #
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium text-[15px]">
                Name
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium text-[15px]">
                Role
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium text-[15px] ">
                Salary
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium text-[15px]">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium text-[15px]">
                Address
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium text-[15px]">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {staff.map((member,index)=>(
              <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td  className="px-6 py-3 text-gray-600 text-[15px]">
                  {index + 1}
                </td>
                <td className="px-6 py-3 text-gray-600 text-[15px]">
                  {member.name}
                </td>
                <td className="px-6 py-3 text-gray-600 text-[15px]">
                  {member.roleName}
                </td>
                <td className="px-6 py-3 flex justify-between items-center text-gray-600 text-[15px]"> 
                  <p>Rs {member.salary.toLocaleString()}</p>
                  <SquarePen 
                   onClick={() => {
                      setSelectedStaff(member);
                      setSalary(member.salary);
                      setEditSalary(true);
                    }}
                  className='w-4 h-4 text-red-400 hover:text-red-500'/>
                </td>
                <td className="px-6 py-3 text-gray-600 text-[15px]">
                  {member.contact}
                </td>
                <td className="px-6 py-3 text-gray-600 text-[15px]">
                  {member.address}
                </td>
                <td className="px-6 py-3">
                  <button 
                   onClick={()=>{setShowPopUp(true);
                    setSelectedStaff(member);
                   }}
                  className="text-red-400 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
    </div>
  )
}

export default StaffTable