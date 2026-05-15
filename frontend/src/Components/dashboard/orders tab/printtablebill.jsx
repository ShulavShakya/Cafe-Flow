function PrintTableBill({ items, tableNumber, subtotal, discountAmount, paymentMethod, finalAmount }) {
  const currentDateTime = new Date().toLocaleString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div
      id="print-area"
      className="fixed -left-2499.75 top-0 w-[80mm] text-[12px] font-mono text-black bg-white"
    >
      {/* HEADER */}
      <div className="text-center">
        <p className="font-bold text-[14px]">NAME OF THE PLACE</p>
        <p>Dharan, Nepal</p>
        <p>Tel: 9800000000</p>
      </div>

      <p className="text-center my-1">
        --------------------------------
      </p>

      {/* BILL INFO */}
      <div className="space-y-0.5">
        <p>Name: Name Here</p>
        <p>Table: {tableNumber}</p>
        <p>Date: {currentDateTime}</p>
      </div>

      <p className="text-center my-1">
        --------------------------------
      </p>

      {/* ITEMS */}
      <div className="space-y-2">
        <p className="font-bold mt-1">Ordered Items</p>

        {items.map((item, index) => (
          <div key={index} className="flex justify-between gap-2">
            <p className="max-w-[45mm]">
              {item.name}
            </p>

            <p className="text-right whitespace-nowrap">
              {item.quantity} x {item.price} ={" "}
              {item.quantity * item.price}
            </p>
          </div>
        ))}

      </div>

      <p className="text-center my-1">
        --------------------------------
      </p>

      {/* TOTALS */}
      <div className="space-y-1">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>Rs {subtotal.toFixed(2)}</p>
        </div>

        <div className="flex justify-between">
          <p>Discount</p>
          <p>Rs {discountAmount.toFixed(2)}</p>
        </div>

        <div className="flex justify-between font-bold text-[13px]">
          <p>Total</p>
          <p>Rs {finalAmount.toFixed(2)}</p>
        </div>
      </div>

      <p className="text-center my-1">
        --------------------------------
      </p>

      {/* PAYMENT */}
      <div className="flex justify-between">
        <p>Payment</p>
        <p>{paymentMethod}</p>
      </div>

      <p className="text-center my-1">
        --------------------------------
      </p>

      {/* FOOTER */}
      <div className="text-center mt-3">
        <p>Thank you!</p>
        <p>Visit again 🙏</p>
      </div>
    </div>
  );
}

export default PrintTableBill;