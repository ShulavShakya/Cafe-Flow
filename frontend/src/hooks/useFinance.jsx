export function useFinance() {
  const tablePayments = [
    {
      id: 1,
      tableNo: 1,
      customer: "John Doe",
      finalPayment: 945,
      paymentType: "QR",
      date: "2026-05-15",
    },
    {
      id: 2,
      tableNo: 2,
      customer: "Jane Smith",
      finalPayment: 1400,
      paymentType: "Cash",
      date: "2026-05-13",
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

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Today's date
  const todayDate = formatDate(new Date());

  // Yesterday's date
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const yesterdayDate = formatDate(yesterday);

  const allPayments = [...tablePayments, ...roomPayments];

  const todayPayments = allPayments.filter((item) => item.date === todayDate);

  // Yesterday's payments
  const yesterdayPayments = allPayments.filter(
    (item) => item.date === yesterdayDate,
  );

  // Today's revenue
  const todayRevenue = todayPayments.reduce(
    (sum, item) => sum + item.finalPayment,
    0,
  );

  // Yesterday's revenue
  const yesterdayRevenue = yesterdayPayments.reduce(
    (sum, item) => sum + item.finalPayment,
    0,
  );

  // Revenue change percentage
  const revenueChange =
    yesterdayRevenue > 0
      ? ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100
      : 100;

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

  // REVENUE MAP (GROUP BY DATE)

  const revenueMap = new Map();

  allPayments.forEach((p) => {
    revenueMap.set(p.date, (revenueMap.get(p.date) || 0) + p.finalPayment);
  });

  // LAST 6 DAYS (FIXED WINDOW)

  const last6Days = Array.from({ length: 6 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (5 - i));

    const formatted = formatDate(date);

    return {
      date: formatted,
      Revenue: revenueMap.get(formatted) || 0,
    };
  });

  return {
    todayRevenue,
    yesterdayRevenue,
    revenueChange,
    allPayments,
    totalRevenue,
    cashCount,
    qrCount,
    tablePayments,
    roomPayments,
    last6Days,
  };
}
