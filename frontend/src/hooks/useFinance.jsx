export function useFinance() {
  const tablePayments = [
    {
      id: 1,
      tableNo: 1,
      customer: "John Doe",
      finalPayment: 945,
      paymentType: "QR",
      date: "2026-04-25",
    },
    {
      id: 2,
      tableNo: 2,
      customer: "Jane Smith",
      finalPayment: 1400,
      paymentType: "Cash",
      date: "2026-04-26",
    },
    {
      id: 3,
      tableNo: 3,
      customer: "Alex Ray",
      finalPayment: 1800,
      paymentType: "Cash",
      date: "2026-04-27",
    },
  ];

  const roomPayments = [
    {
      id: 1,
      roomNo: 101,
      guest: "Michael Lee",
      finalPayment: 2800,
      paymentType: "QR",
      date: "2026-04-25",
    },
    {
      id: 2,
      roomNo: 102,
      guest: "Sara Khan",
      finalPayment: 2400,
      paymentType: "Cash",
      date: "2026-04-26",
    },
    {
      id: 3,
      roomNo: 103,
      guest: "David Kim",
      finalPayment: 3500,
      paymentType: "QR",
      date: "2026-04-27",
    },
  ];

  const allPayments = [...tablePayments, ...roomPayments];

  // Total revenue
  const totalRevenue = allPayments.reduce(
    (sum, item) => sum + item.finalPayment,
    0,
  );

  // Cash payments
  const cashCount = allPayments.filter(
    (item) => item.paymentType === "Cash",
  ).length;

  // QR payments
  const qrCount = allPayments.filter(
    (item) => item.paymentType === "QR",
  ).length;

  return {
    allPayments,
    totalRevenue,
    cashCount,
    qrCount,
    tablePayments,
    roomPayments,
  };
}
