function PrintTableBill() {
  return (
    <div
      id="print-area"
      className="fixed -left-2499.75 top-0 w-[80mm] p-2 text-[12px] font-mono"
    >
      {/* HEADER */}
      <div className="text-center">
        <p className="font-bold text-[14px]">NAME OF THE PLACE</p>
        <p>Dharan, Nepal</p>
        <p>Tel: 9800000000</p>
      </div>

      <p className="text-center my-1">------------------------------</p>

      {/* BILL INFO */}
      <div className="space-y-0.5">
        <p>Guest: Ram Bahadur</p>
        <p>Room: 101 </p>
        <p>Date: 2026-05-02 10:30 AM</p>
      </div>

      <p className="text-center my-1">------------------------------</p>

      {/* ITEMS */}
      <div className="space-y-2">

        {/* ROOM */}
        <div>
          <div className="flex justify-between">
            <p>Room (4 nights)</p>
            <p>4 x 1000 = 4000</p>
          </div>
          <p className="text-[11px] text-gray-600">(2 beds)</p>
        </div>

        {/* ROOM SERVICE */}
        <div>
          <p className="font-bold mt-1">Ordered Items</p>

          <div className="flex justify-between">
            <p>Tea</p>
            <p>2 x 50 = 100</p>
          </div>

          <div className="flex justify-between">
            <p>Momo</p>
            <p>1 x 150 = 150</p>
          </div>
        </div>
      </div>

      <p className="text-center my-1">------------------------------</p>

      {/* TOTALS */}
      <div className="space-y-1">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>Rs 4250</p>
        </div>

        <div className="flex justify-between">
          <p>Discount</p>
          <p>Rs 250</p>
        </div>

        <div className="flex justify-between font-bold">
          <p>Total</p>
          <p>Rs 4000</p>
        </div>
      </div>

      <p className="text-center my-1">------------------------------</p>

      {/* PAYMENT */}
      <div className="flex justify-between">
        <p>Payment</p>
        <p>Cash</p>
      </div>

      <p className="text-center my-1">------------------------------</p>

      {/* FOOTER */}
      <div className="text-center mt-2">
        <p>Thank you!</p>
        <p>Visit again 🙏</p>
      </div>
    </div>
  );
}

export default PrintTableBill