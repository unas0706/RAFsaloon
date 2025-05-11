export const filterBookings = (bookings, selectedDate, searchQuery) => {
  const filteredByDate = selectedDate
    ? bookings.filter((booking) => booking.date === selectedDate)
    : bookings;

  return (
    bookings.length > 0 &&
    filteredByDate?.filter((booking) => {
      return (
        booking.phone.toString().includes(searchQuery.toLowerCase()) ||
        booking.service.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
  );
};

export const filterMembers = (members, searchQuery) => {
  return members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.membership.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.subscription.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

export const calculateStatistics = (bookings, members) => {
  const today = new Date().toISOString().split("T")[0];
  const currentMonth = new Date().getMonth();

  return {
    todayBookingsCount: bookings.filter((b) => b.date === today).length,
    monthlyBookingsCount: bookings.filter(
      (b) => new Date(b.date).getMonth() === currentMonth
    ).length,
    totalMembersCount: members.length,
    premiumMembersCount: members.filter((m) => m.membership === "Premium")
      .length,
    subscribedMembersCount: members.filter((m) => m.subscription !== "None")
      .length,
  };
};
