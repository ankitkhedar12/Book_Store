import { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function datePicker () {
  // eslint-disable-next-line react-hooks/rules-of-hooks
    const [startDate, setStartDate] = useState();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [endDate, setEndDate] = useState();
    const onDateChange = (dates) => {
        const [start, end] = dates;
        console.log("Start: ", start, "End: ", end);
        setStartDate(start);
        setEndDate(end);
      };
  return (
    <div>
        <DatePicker
        dateFormat="dd/MM/yyyy"
        selected={startDate}
        onChange={onDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        placeholderText="From Date"
        closeOnScroll={true}
        className = 'red-border'
        // excludeDates={[new Date(), subDays(new Date(), 1)]}
        minDate={new Date()}
        maxDate={(new Date(), 365)}
        />
    </div>
  )
}