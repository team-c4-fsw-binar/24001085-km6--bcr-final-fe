import React from 'react';

const Seat = ({ seat, onSeatSelect, isSelected }) => {
    const handleClick = () => {
        if (!seat.booked) {
            onSeatSelect(seat);
        }
    };

    // Hide the seat if seat_no is not available
    if (!seat.seat_no) {
        return null;
    }

    return (
        <div
            style={{
                ...styles.seat,
                ...(seat.booked ? styles.seatReserved : {}),
                ...(isSelected ? styles.seatSelected : {}),
            }}
            onClick={handleClick}
        >
            {seat.seat_no}
        </div>
    );
};

const styles = {
    seat: {
        margin: '2px',
        width: '40px',
        height: '40px',
        fontSize: '16px',
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        backgroundColor: '#73CA5C',
        color: '#fff',
        overflow: 'hidden',
        cursor: 'pointer',
        borderRadius: '5px',
    },
    seatReserved: {
        backgroundColor: 'grey',
        color: '#fff',
        border: 'none',
        cursor: 'not-allowed',
    },
    seatSelected: {
        backgroundColor: '#7126B5',
        color: '#fff',
        border: 'none',
    },
};

export default Seat;
