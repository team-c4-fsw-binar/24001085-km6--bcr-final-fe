export const postBooking = (bookingData) => {
    let data = new FormData();

    // Mengambil dan menambahkan data dari bookingData ke FormData
    data.append("passengers", JSON.stringify(bookingData.passengerDetails));
    data.append("departureSeats", JSON.stringify(bookingData.departureSeats));
    data.append("returnSeats", JSON.stringify(bookingData.returnSeats));

    let config = {
        method: "post",
        url: `${import.meta.env.VITE_BACKEND_API}/api/bookings`,
        data: data,
    };

    axios(config)
        .then((response) => {
            if (response.status === 200 || response.status === 201) {
                toast.success("Booking successful!");
            } else {
                toast.error("Booking failed!");
            }
        })
        .catch((error) => {
            toast.error("Booking failed!");
        });
};
