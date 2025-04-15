import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import * as React from "react";

export default function TimePickerValue() {
  const [value, setValue] = React.useState(dayjs("2023-01-01T00:44:36")); // Set default time

  const handleChange = (newValue) => {
    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label="Time"
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            id="resolved_time"
            name="resolved_time"
            helperText="HH:mm:ss"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "black",
                },
                "&:hover fieldset": {
                  borderColor: "green",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "green",
                },
              },
              "& .MuiInputBase-input": {
                color: "#3b3838",
                padding: "8px",
                fontWeight: "600",
              },
              "& .MuiFormHelperText-root": {
                color: "gray",
              },
            }}
            required
          />
        )}
        views={["hours", "minutes", "seconds"]}
        ampm={true} // Set to true for 12-hour format
      />
    </LocalizationProvider>
  );
}
