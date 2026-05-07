import { useState } from "react";
import { Plus, Minus,} from "lucide-react";

function KitchenOrderTicket({orderSlip, setOrderSlip}) {
    const [location, setLocation] = useState("table");
    const [tableNumber, setTableNumber] = useState("");
    const [roomNumber, setRoomNumber] = useState("");
    const [guestName, setGuestName] = useState("");
    const [customization, setCustomization] = useState("");
    const [msg, setMsg] = useState("");

    const itemCount = (id) =>{
        return orderSlip.filter((item) => item.id === id).length;
    }

    const uniqueItems = orderSlip.filter(
    (item, index, self) =>
        index === self.findIndex((i) => i.id === item.id)
    );

    const updateQuantity = (id, change) => {
        if (change === 1) {
            //add item
            const existingItem = orderSlip.find((item) => item.id === id);
            if (existingItem) {
                setOrderSlip([...orderSlip, existingItem]);
            }
        } 
        else {
            //remove item
            const itemIndex = orderSlip.findIndex((item) => item.id === id);
            if (itemIndex !== -1) {
                const updatedSlip = [...orderSlip];
                updatedSlip.splice(itemIndex, 1);
                setOrderSlip(updatedSlip);
            }
        }
    };

    const totalPrice = orderSlip.reduce((sum, item) => {
        return sum + item.price;
    }, 0);
    
    const validateSlip = () => {
        if(location === "table"){
            if(!tableNumber){
                setMsg("Please enter table number.");
                return;
            }
        }
        if(location === "room"){
            if(!roomNumber){
                setMsg("Please enter room number.");
                return;
            }
        }
        if(!guestName){
            setMsg("Please enter guest name.");
            return;
        }
        
        if(orderSlip.length === 0){
            setMsg("Please add at least one item to the order.");
            return;
        }

        setMsg("");
        setTableNumber("");
        setRoomNumber("");
        setGuestName("");
        setCustomization("");
        setOrderSlip([]);
    };

    return(
    <div className='grid grid-cols-1 md:grid-cols-3'>
        <div className='bg-white rounded-2xl shadow-sm p-6'>
            <div className='flex flex-col'>
            
                <h3 className='font-semibold text-[19px] mb-6'>
                    Create Order
                </h3>

                {/* Selecting location */}
                <div className="flex items-center gap-2 font-medium mb-4">
                    Order For:
                    <input type="radio" name="location" value="table"
                    checked={location==="table"}
                    onChange={(e)=>setLocation(e.target.value)}
                    /> Table 

                    <input type="radio" name="location" value="room"
                    checked={location==="room"}
                    onChange={(e)=>setLocation(e.target.value)}
                    /> Room 
                </div>

                {/* Number input */}
                <p className='mb-2 text-[16px]'>{location==="table"?"Table":"Room"} Number:</p>
                <input
                    type="number"
                    placeholder={location==="table"?"Enter table number":"Enter room number"}
                    value={location==="table"? tableNumber : roomNumber}
                    onChange={(e) => location==="table" 
                        ? setTableNumber(e.target.value) 
                        : setRoomNumber(e.target.value)
                    }
                    className='border rounded-lg p-2 mb-4'
                />

                {/* Name input */}
                <p className='mb-2 text-[16px]'>Guest Name:</p>
                <input
                    type="text"
                    placeholder="Enter guest name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className='border rounded-lg mb-4 p-2'
                />

                {/* Customization request */}
                <p className='mb-2 text-[16px]'>Customization:</p>
                <textarea
                    placeholder="Food customization request here (optional)"
                    value={customization}
                    onChange={(e) => setCustomization(e.target.value)}
                    className='border rounded-lg mb-4 p-2 w-full'
                />

                {uniqueItems.map((item) => (
                    <div key={item.id} className='mt-3 mb-3 flex items-center font-medium gap-8 text-[16.5px] justify-between text-gray-700'>
                    {item.name} x {itemCount(item.id)}
                        <div className="flex items-center gap-4">
                            <button onClick={() => updateQuantity(item.id, -1)}>
                            <Minus className='w-4.5 h-4.5'/>
                            </button>
                            <button onClick={() => updateQuantity(item.id, 1)}>
                            <Plus className='w-4.5 h-4.5'/>
                            </button>
                        </div>
                    </div>
                ))}

                <p className='mt-4 text-[16px] font-semibold mb-2 border-t border-dashed border-gray-700 pt-3'>
                    Total: Rs {totalPrice}
                </p>

                <p className='text-[16px] font-semibold text-red-500 mb-4 pt-3'>
                    {msg}
                </p>

                <div className='flex items-center justify-center'>                
                    <button 
                    onClick={()=>validateSlip()}
                    className='bg-green-500 font-medium rounded-xl text-white w-fit px-5 py-1.5
                    hover:bg-green-400 text-lg'>
                    Finalize Order
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default KitchenOrderTicket