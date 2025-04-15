import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import { Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import logo from "../../assets/pdflogo.png";
import jsPDF from "jspdf";
import { CSVLink } from "react-csv";

const CustomToolbar = ({
  columns,
  onColumnToggle,
  dropdownValue,
  onDropdownChange,
}) => {
  return (
    <div className="text-center">
      <Box>
        <FormControl
          variant="outlined"
          size="small"
          style={{
            width: "50%",
            margin: "20px",
            backgroundColor: "white",
            boxShadow: "0 0 5px black",
          }}
        >
          <InputLabel id="dropdown-label">Form Name</InputLabel>
          <Select
            labelId="dropdown-label"
            value={dropdownValue}
            onChange={onDropdownChange}
            label="Form Name" // Optional: This can be omitted as InputLabel is already providing the label.
          >
            <MenuItem value="1002">Access Control Request Form</MenuItem>
            <MenuItem value="1004">
              E-mail address Creation/Deletion/Modification Form
            </MenuItem>
            <MenuItem value="1005">Group E-mail Creation Form</MenuItem>
            <MenuItem value="1010">
              Domain ID Create/Freeze/Edit/Reset/Unlock/Transfer Form
            </MenuItem>
            <MenuItem value="2001">
              CBS-User Permission/Role (“BankUltimus”- CBS Systems)
            </MenuItem>
            {/* <MenuItem value="1006">Incident Report Form</MenuItem> */}
            {/* <MenuItem value="1015">Database Access Right Request Form</MenuItem> */}
          </Select>
        </FormControl>

        {/* Show checkboxes only if a specific dropdown option is selected */}
        {dropdownValue && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              gap: 1,
              marginX: 5,
              padding: 2,
              backgroundColor: "white",
              boxShadow: "0 0 5px black",
            }}
          >
            {columns.map((column) => (
              <Box
                key={column.field} // Added key here
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  paddingX: "4px",
                  border: "1px solid gray",
                  borderRadius: 1,
                  fontWeight: 500,
                  fontSize: 12,
                  backgroundColor: `${!column.hide ? "green" : ""}`,
                  color: `${!column.hide ? "white" : ""}`,
                }}
              >
                <input
                  id={column.field}
                  type="checkbox"
                  checked={!column.hide}
                  onChange={() => onColumnToggle(column.field)}
                />
                <label htmlFor={column.field}>{column.headerName}</label>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </div>
  );
};

const Reports = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [dropdownValue, setDropdownValue] = useState("");
  const [searchText, setSearchText] = useState({});
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;

  useEffect(() => {
    const fetchData = async (value) => {
      try {
        const response = await fetch(
          `http://localhost:8081/api/report/view/${value}/${userid}`
        );
        const result = await response.json();
        if (result) {
          setData(result);
          if (result.length > 0) {
            const cols = Object.keys(result[0]).map((key) => ({
              field: key,
              headerName: key.charAt(0).toUpperCase() + key.slice(1),
              width: 150,
              hide: true,
              renderHeader: () => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    backgroundColor: "#E8E8E8",
                    borderRadius: "0px",
                  }}
                >
                  <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                  <input
                    type="text"
                    placeholder={`Search ${key}`}
                    onChange={(e) => handleSearch(key, e.target.value)}
                    style={{
                      width: "100%",
                      padding: "2px",
                      textAlign: "center",
                      border: "1px solid #cfcdcc",
                      fontSize: 12,
                    }}
                  />
                </div>
              ),
            }));
            setColumns(cols);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (dropdownValue) {
      fetchData(dropdownValue);
    }
  }, [dropdownValue]);

  const handleColumnToggle = (field) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.field === field ? { ...col, hide: !col.hide } : col
      )
    );
  };

  const handleDropdownChange = (event) => {
    setDropdownValue(event.target.value);
    // Reset data and columns when the dropdown changes
    setData([]);
    setColumns([]);
  };

  const handleSearch = (field, value) => {
    setSearchText((prev) => ({ ...prev, [field]: value }));
  };

  // Filter out the hidden columns for the DataGrid
  const visibleColumns = columns.filter((col) => !col.hide);

  const filteredData = data.filter((row) => {
    return Object.keys(searchText).every((key) => {
      const searchValue = searchText[key]?.toLowerCase() || "";
      const rowValue = row[key]?.toString().toLowerCase() || "";
      return rowValue.includes(searchValue) && rowValue !== "";
    });
  });

  const generatePDF = (type) => {
    // Define the minimum width for A4 in landscape orientation
    const minWidth = 210; // A4 width in mm (landscape)
    const doc = new jsPDF("p", "mm");

    const imgElement = new Image();
    imgElement.src = logo; // Use the imported image

    imgElement.onload = () => {
      const imgWidth = doc.internal.pageSize.getWidth() * 0.5; // 50% of page width
      const imgHeight = (imgElement.height / imgElement.width) * imgWidth; // Maintain aspect ratio
      const xPosition = (doc.internal.pageSize.getWidth() - imgWidth) / 2; // Center the image
      const topMargin = 10;
      const imageYPosition = topMargin;

      // Draw a border below the image
      const borderYPosition = imageYPosition + imgHeight + 4; // 4px below the image

      doc.setDrawColor("#b5b5b5");
      doc.setLineWidth(0.3);
      doc.line(
        0,
        borderYPosition,
        doc.internal.pageSize.getWidth(),
        borderYPosition
      );

      // Set dynamic text based on type
      const text = `All (${type.charAt(0).toUpperCase() + type.slice(1)})`;
      const textWidth = doc.getTextWidth(text);
      const xTextPosition = (doc.internal.pageSize.getWidth() - textWidth) / 2;

      // Set the Y position for the text
      const yPosition = borderYPosition + 10;

      // doc.text(text, xTextPosition, yPosition);

      // Get dynamic headers from visible columns
      const headers = visibleColumns.map((col) => col.headerName);

      // Prepare data for the table based on visible columns
      const tableData = filteredData.map((item) => {
        return visibleColumns.map((col) => {
          if (col.field === "submittime") {
            return new Date(item[col.field]).toLocaleString(); // Format date
          }
          return item[col.field]; // Return the corresponding item value
        });
      });

      // Calculate total width based on number of headers
      const columnWidth = 40; // Example column width in mm
      const totalWidth = Math.max(minWidth, headers.length * columnWidth); // Calculate total width
      const rightMargin = 10; // Set right margin

      // Create dynamic column styles
      const columnStyles = {};
      headers.forEach((_, index) => {
        columnStyles[index] = { cellWidth: columnWidth };
      });

      const currentWidth = Math.max(
        minWidth,
        headers.length * columnWidth + rightMargin
      );
      doc.internal.pageSize.width = currentWidth;

      // Center the header on each page
      const headerXPosition =
        (currentWidth - doc.internal.pageSize.getWidth()) / 2;
      doc.text(
        text,
        headerXPosition + (currentWidth - textWidth) / 2,
        yPosition
      );
      // Add the image
      doc.addImage(
        imgElement.src,
        "PNG",
        headerXPosition + (currentWidth - imgWidth) / 2,
        imageYPosition,
        imgWidth,
        imgHeight
      );

      doc.setDrawColor("#b5b5b5");
      doc.setLineWidth(0.3);
      doc.line(
        0,
        borderYPosition,
        doc.internal.pageSize.getWidth(),
        borderYPosition
      );

      // Render the table
      let startY = yPosition + 10;
      doc.autoTable({
        head: [headers],
        body: tableData,
        startY: startY,
        headStyles: { halign: "center" },
        styles: { halign: "center", overflow: "linebreak" },
        columnStyles: columnStyles, // Use dynamic column styles
        margin: { right: rightMargin }, // Set right margin
        didDrawPage: function (data) {
          // Adjust page width for each page
          const currentWidth = Math.max(
            minWidth,
            headers.length * columnWidth + rightMargin + 20
          );
          doc.internal.pageSize.width = currentWidth;
          // Center the header on each page
        },
      });

      // Save the PDF with a dynamic filename
      doc.save(`${new Date().toLocaleString()}.pdf`);
    };

    imgElement.onerror = () => {
      console.error("Error loading image");
    };
  };

  const generateCSV = () => {
    // Get dynamic headers from visible columns
    const headers = visibleColumns.map((col) => col.headerName);

    // Prepare data for the table based on visible columns
    const tableData = filteredData.map((item, index) => {
      return visibleColumns.map((col) => {
        if (col.field === "submittime") {
          return new Date(item[col.field]).toLocaleString(); // Format date
        }
        return item[col.field]; // Return the corresponding item value
      });
    });

    return { tableData, headers };
  };

  // end csv

  return (
    <div className="w-full overflow-auto">
      <CustomToolbar
        columns={columns}
        onColumnToggle={handleColumnToggle}
        dropdownValue={dropdownValue}
        onDropdownChange={handleDropdownChange}
      />
      {/* Only show the DataGrid if there are visible columns */}
      <div className="flex justify-center max-h-[400px] w-full">
        {visibleColumns.length > 0 ? (
          <div className="w-full h-76 my-5 px-10">
            <DataGrid
              sx={{
                boxShadow: "0 0 10px black", // Softer shadow
                padding: "10px",
                // borderRadius: "10px", // Rounded corners for the grid
                backgroundColor: "#fff", // White background for contrast
                "& .MuiDataGrid-cell": {
                  // background: "linear-gradient(135deg, #e0f7fa, #becee7)", // Gradient background for cells
                  color: "#333", // Neutral text color
                  fontWeight: "600", // Slightly bold text
                  borderBottom: "1px solid #ccc", // Cell bottom border
                  transition: "background 0.3s ease, transform 0.2s ease", // Smooth hover effect
                  textAlign: "center",
                  borderRight: "1px solid #cfcdcc",
                  borderLeft: "1px solid #cfcdcc",
                },
                "& .MuiDataGrid-cell:hover": {
                  background: "linear-gradient(135deg, #ffcc80, #ffab91)", // Different gradient on hover
                  transform: "scale(1.03)", // Slight zoom on hover
                  cursor: "pointer", // Pointer cursor for interactivity
                },
                // Apply alternating row colors
                "& .MuiDataGrid-row:nth-of-type(odd)": {
                  backgroundColor: "white", // Light blue for odd rows
                },
                "& .MuiDataGrid-row:nth-of-type(even)": {
                  backgroundColor: "#F0F0F0 !important", // Light gray for even rows
                  //background: "linear-gradient(135deg, #e0f7fa, #becee7)",
                },
                "& .MuiDataGrid-columnHeaders": {
                  //background: "linear-gradient(135deg, #c0392b, #e74c3c)", // Gradient for column headers

                  color: "black", // Black text for column headers
                  fontSize: "10pt", // Larger font size for column headers
                  fontWeight: "bold", // Bold text for emphasis
                  textAlign: "center", // Centered text
                },
                // "& .MuiDataGrid-footerContainer": {
                //   background: "#f5f5f5", // Subtle footer background
                //   color: "#555", // Footer text color
                //   borderTop: "1px solid #ccc", // Footer border
                //   padding: 0,
                //   height: "10px !important",
                // },
                "& .MuiDataGrid-footerContainer": {
                  background: "#f5f5f5", // Subtle footer background
                  color: "#555", // Footer text color
                  borderTop: "1px solid #ccc", // Footer border
                  padding: "0 10px", // Adjust padding to make it smaller
                  height: "30px", // Set desired height, adjust this as needed
                  minHeight: "30px", // Ensure it doesn't grow beyond this height
                  fontSize: "0.75rem", // Optional: Reduce font size for a more compact footer
                },

                "& .css-1o37pnf-MuiTablePagination-root": {
                  overflow: "hidden",
                },
                "& .css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar": {
                  height: "30px !important",
                },
              }}
              rows={filteredData}
              columns={visibleColumns}
              rowHeight={30} // Slightly taller rows for better spacing
              disableColumnMenu
              disableColumnSorting
              initialState={{
                ...data.initialState,
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              pageSizeOptions={[5, 10, 25, { value: -1, label: "All" }]}
            />
          </div>
        ) : null}
      </div>
      {visibleColumns.length > 0 ? (
        <div className="w-full flex justify-center gap-5">
          <button
            onClick={() => generatePDF("Reports")}
            className="bg-gray-300 text-gray-700 px-2 py-1 rounded disabled:opacity-50"
          >
            Download PDF
          </button>
          <CSVLink
            data={generateCSV().tableData}
            headers={generateCSV().headers}
            filename={`${new Date().toLocaleString()}.csv`}
            className="bg-gray-300 text-gray-700 px-2 py-1 rounded disabled:opacity-50"
          >
            Export CSV
          </CSVLink>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Reports;
