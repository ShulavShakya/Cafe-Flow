import {Coffee, Plus, Trash2, CircleX, CircleCheck} from "lucide-react"
import { MdRoomService } from "react-icons/md";
import { FaUtensilSpoon } from "react-icons/fa";
import { FaGlassWater } from "react-icons/fa6";
import { useState } from "react";

function MenuItemCard({menuItemsData, toggleAvailability, deleteItem, addToOrder}) {

  const [deletePopup, setDeletePopup] = useState(null);

  return(
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 
    max-h-150 overflow-y-auto p-3 mb-6 rounded-xl border border-gray-100 ">
      {menuItemsData.map((item) => (
        <div key={item.id} className="bg-white rounded-xl h-fit p-5 shadow-sm">
          
          <div className="flex justify-between mb-3">
            <div className="flex gap-3">
              
              {/* Category based icons */}
              <div className="bg-red-50 p-2 rounded-lg flex items-center justify-center">  
                {item.category === "Hot Beverage" ? (
                  <Coffee className="w-5 h-5 text-red-500" />
                ) : 
                item.category === "Food" ? (
                  <MdRoomService className="w-5 h-5 text-red-500" />
                ) : 
                item.category === "Drinks"? (
                  <FaGlassWater className="w-5 h-5 text-red-500" />
                ) : 
                (
                  <FaUtensilSpoon className="w-5 h-5 text-red-500" />
                )}
              </div>
              
              {/* Item name and category */}
              <div>
                <h3>{item.name}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>
              </div>

            </div>

            <button onClick={() => setDeletePopup(item)}>
              <Trash2 className="w-5 h-5 text-red-400 hover:text-red-600" />
            </button>
          </div>

          <p className="font-medium mb-3">Rs {item.price}</p>

          <div className="flex justify-between">
            
            <button
              onClick={() => addToOrder(item)}
              disabled={!item.available}
              className="bg-red-500 flex items-center justify-center gap-1 
              rounded-lg px-3 py-1 text-slate-50 font-medium hover:bg-red-600"
            >
              Add to Order
              <Plus className="w-5 h-5" />
            </button>

            {/* Availability toggle */}
            <button 
              onClick={() => toggleAvailability(item.id)}
              className="border border-gray-100 rounded-2xl px-3 py-1 shadow-sm hover:bg-gray-50"
            >
              {item.available ? (
                <div className="flex items-center text-green-500 gap-1">
                    <CircleCheck className="w-5 h-5 text-green-500" />
                    Available
                </div>
              ) : (
                <div className="flex items-center text-red-500 gap-1">
                    <CircleX className="w-5 h-5 text-red-500" />
                    Unavailable
                </div>
              )}
            </button>

          </div>
        </div>
      ))}

      {deletePopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 flex flex-col items-center justify-center">
            
            <p className="mb-6 font-medium text-center text-[17px]">
              Are you sure you want to remove {deletePopup.name} from the menu?
            </p>
            
            <div className="flex justify-center items-center gap-4">
              <button 
              onClick={() => setDeletePopup(null)} 
              className="bg-gray-600 text-white text-sm mt-1 font-medium px-4 py-2 rounded-lg hover:bg-gray-700">
                Cancel
              </button>
              <button onClick={() => {
                deleteItem(deletePopup.id);
                setDeletePopup(null);
              }} 
              className="bg-red-500 text-white text-sm mt-1 font-medium px-4 py-2 rounded-lg hover:bg-red-600">
                Remove
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default MenuItemCard