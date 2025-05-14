import Checkbox from "@mui/material/Checkbox";
import {
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "./searchviewcomplaint.css";
import EditViewComplaint from "../editViewComplaint/editViewComplaint";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import CallIcon from "@mui/icons-material/Call";

const initialState = {
  searchBy: "",
  bcId: "",
  status: "",
  caseType: "",
  product: "",
  category: "",
  subCategory: "",
  title: "",
  data: {},
};

export default function Searchviewcomplaint() {
  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      headerClassName: "data-Grid-Header-Color",
      renderCell: (params) => (
        <div className="actions-buttons">
          <VisibilityIcon
            sx={{ mr: 1 }}
            onClick={() => handleEditView("View", params.row)}
          />
          <EditIcon
            sx={{ ml: 1, mr: 1 }}
            onClick={() => handleEditView("Edit", params.row)}
          />
          <CallIcon sx={{ ml: 1 }} />
        </div>
      ),
    },
    {
      field: "ticketNo",
      headerName: "Ticket No",
      width: 140,
      editable: true,
      headerClassName: "data-Grid-Header-Color",
    },
    {
      field: "bcId",
      headerName: "BC ID",
      width: 160,
      editable: true,
      headerClassName: "data-Grid-Header-Color",
    },
    {
      field: "bcName",
      headerName: "BC Name",
      width: 250,
      editable: true,
      headerClassName: "data-Grid-Header-Color",
    },
    {
      field: "status",
      headerName: "Status",
      width: 122,
      editable: true,
      headerClassName: "data-Grid-Header-Color",
    },
    {
      field: "caseType",
      headerName: "Case Type",
      width: 150,
      editable: true,
      headerClassName: "data-Grid-Header-Color",
    },
    {
      field: "mobileNo",
      headerName: "Mobile Number",
      width: 180,
      editable: true,
      headerClassName: "data-Grid-Header-Color",
    },
    {
      field: "createdBy",
      headerName: "Created By",
      width: 175.4,
      editable: true,
      headerClassName: "data-Grid-Header-Color",
    },
  ];

  const [entity, setEntity] = React.useState(initialState);
  const [event, setEvent] = React.useState(true);

  const handleEventChange = (e) => {
    setEntity({ ...entity, [e.target.name]: e.target.value });
  };

  const handleEditView = (title, object) => {
    setEntity({ ...entity, title: title, data: object });
    setEvent(false);
  };

  const base_url = "http://localhost:3000";
  const [viewComplaintList, setViewComplaintList] = React.useState([]);

  React.useEffect(() => {
    console.log("useEffect is Called");
    getComplaintList();
  }, []);

  const getComplaintList = async () => {
    await fetch(base_url + "/data/viewAndSearch.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        console.log(res);
        if (res.data.length >= 1) {
          setViewComplaintList(res.data);
        } else {
          setViewComplaintList([]);
        }
      });
  };

  return (
    <>
      {event ? (
        <Card sx={{height:"90%"}}>
          <CardContent>
            <div className="search-view-heading">
              <Typography variant="h6">Search and View Complaint</Typography>
              <FormControlLabel
                control={<Checkbox />}
                label="Show All Columns"
              />
            </div>
            <Grid container spacing={1} rowGap={1}>
              <Grid size={{ md:2.5 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="search-by-label" required>
                    Search By
                  </InputLabel>
                  <Select
                    labelId="search-by-label"
                    id="search-by"
                    label="Search By"
                    name="searchBy"
                    value={entity.searchBy}
                    onChange={handleEventChange}
                  >
                    <MenuItem value="BC ID">BC ID</MenuItem>
                    <MenuItem value="BC ID 1">BC ID 1</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ md: 3 }}>
                <TextField
                  id="bc-id"
                  label="BC ID"
                  variant="outlined"
                  name="bcId"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  value={entity.bcId}
                  onChange={handleEventChange}
                />
              </Grid>
              <Grid size={{ md: 2 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    id="status"
                    name="status"
                    label="Status"
                    value={entity.status}
                    onChange={handleEventChange}
                  >
                    <MenuItem value="select">--Select--</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ md: 2 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="case-type-label">Case Type</InputLabel>
                  <Select
                    labelId="case-type-label"
                    id="case-type"
                    label="Case Type"
                    name="caseType"
                    value={entity.caseType}
                    onChange={handleEventChange}
                  >
                    <MenuItem value="select">--Select--</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ md: 2.5 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="product-label">Product</InputLabel>
                  <Select
                    labelId="product-label"
                    id="product"
                    label="Product"
                    name="product"
                    value={entity.product}
                    onChange={handleEventChange}
                  >
                    <MenuItem value="select">--Select--</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ md: 2.5 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="From Date"
                      slotProps={{
                        textField: {
                          size: "small", // reduces height
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid size={{ md: 2.5 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DemoContainer components={["DatePicker"]} >
                    <DatePicker
                      label="To Date"
                      slotProps={{
                        textField: {
                          size: "small", // reduces height
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid size={{ md:2.5 }}>
                <FormControl fullWidth size="small" sx={{ pt: 1 }}>
                  <InputLabel id="category-label" sx={{ pt: 1 }}>
                    Category
                  </InputLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    label="Category"
                    name="category"
                    value={entity.category}
                    onChange={handleEventChange}
                  >
                    <MenuItem value="select">--Select--</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ md: 2.5}}>
                <FormControl fullWidth size="small" sx={{ pt: 1 }}>
                  <InputLabel id="sub-category-label" sx={{ pt: 1 }}>
                    Sub Category
                  </InputLabel>
                  <Select
                    labelId="sub-category-label"
                    id="sub-category"
                    label="Sub Category"
                    name="subCategory"
                    value={entity.subCategory}
                    onChange={handleEventChange}
                  >
                    <MenuItem value="select">--Select--</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ md: 2 }} className="icons-style" sx={{ pt: 1 }}>
                <div className="icons">
                  <SearchIcon />
                </div>
                <div className="icons">
                  <RestartAltIcon />
                </div>
                <div className="icons">
                  <DownloadIcon />
                </div>
              </Grid>
              <Grid size={{ md: 12 }}>
                <Box sx={{ height: 315, width: "100%" }}>
                  <DataGrid
                    rows={viewComplaintList}
                    columns={columns}
                    getRowId={(row) => row.id}
                    rowHeight={40}
                    columnHeaderHeight={40}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 5,
                        },
                      },
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                  />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ) : (
        <EditViewComplaint
          title={entity.title}
          rowData={entity.data}
          onCancel={() => setEvent(true)}
        />
      )}
    </>
  );
}
