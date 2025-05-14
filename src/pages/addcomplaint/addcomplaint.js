import {
  Button,
  Card,
  CardContent,
  Grid,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./addcomplaint.css";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const initialState = {
  bcId: "",
  bcName: "",
  mobileNo: "",
  state: "",
  district: "",
  village: "",
  bankName: "",
  branchName: "",
  branchCode: "",
  category: "",
  subCategory: "",
  caseType: "",
  channel: "",
  product: "",
  componentName: "",
  status: "",
  discription: "",
  attachment: "",
  select: "BC ID",
};

export default function Addcomplaint() {
  const [entity, setEntity] = React.useState(initialState);

  const handleEventChange = (e) => {
    setEntity({ ...entity, [e.target.name]: e.target.value });
  };

  const onSubmitEditComplaint = () => {
    if (entity.bcId === "") {
      alert("BC Id is required");
    } else if (entity.bcName === "") {
      alert("BC Name is required");
    } else if (entity.mobileNo === "") {
      alert("Mobile no is required");
    } else if (entity.mobileNo.length !== 10) {
      alert("Please enter a valid mobile number");
    } else if (entity.state === "") {
      alert("State is required");
    } else if (entity.district === "") {
      alert("District is required");
    } else if (entity.village === "") {
      alert("Village  is required");
    } else if (entity.bankName === "") {
      alert("Bank Name is required");
    } else if (entity.branchName === "") {
      alert("Branch Name is required");
    } else if (entity.branchCode === "") {
      alert("Branch Code is required");
    } else if (entity.category === "") {
      alert("Complaint category is required");
    } else if (entity.subCategory === "") {
      alert("Complaint sub category is required");
    } else if (entity.caseType === "") {
      alert("Casetype is required");
    } else if (entity.channel === "") {
      alert("Channel is required");
    } else if (entity.product === "") {
      alert("Product is required");
    } else if (entity.componentName === "") {
      alert("Component Name is required");
    } else if (entity.status === "") {
      alert("Status is required");
    } else if (entity.discription === "") {
      alert("Descriptions is required");
    } else {
      alert("Complaint Added Successfully");
    }
  };

  const onResetEditComplaint = () => {
    setEntity(initialState);
  };

  const Number = (e) => {
    if (
      !/[\d]/.test(e.key) &&
      !["Backspace", "ArrowLeft", "ArrowRight", "Delete"].includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <div className="add-complaint-heading">
            <Typography variant="h6">Add Complaint</Typography>
            <Typography variant="h6">Project Name: BANK</Typography>
            <Button disabled variant="contained">
              VIEW TICKET HISTORY
            </Button>
          </div>
          <br />
          <Grid container spacing={1}>
            <Grid size={{ md: 8 }}>
              <RadioGroup
                row
                value={entity.select}
                onChange={handleEventChange}
                name="select"
              >
                <FormControlLabel
                  value="BC ID"
                  control={<Radio />}
                  label="BC ID"
                />
                <FormControlLabel
                  value="BC Name"
                  control={<Radio />}
                  label="BC Name"
                />
                <FormControlLabel
                  value="Mobile Number"
                  control={<Radio />}
                  label="Mobile Number"
                />
              </RadioGroup>
            </Grid>
            <Grid size={{ md: 4 }}>
              <FormControl size="small" id="bcid" fullWidth required>
                <InputLabel>{entity.select}</InputLabel>
                <OutlinedInput
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid size={{ md: 4 }}>
              <TextField
                id="bcid"
                name="bcId"
                label="BC ID"
                variant="outlined"
                autoComplete="off"
                fullWidth
                value={entity.bcId}
                onChange={handleEventChange}
                required
                size="small"
              ></TextField>
            </Grid>
            <Grid size={{ md: 4 }}>
              <TextField
                id="bcname"
                label="BC Name"
                name="bcName"
                variant="outlined"
                autoComplete="off"
                fullWidth
                value={entity.bcName}
                onChange={handleEventChange}
                required
                size="small"
              ></TextField>
            </Grid>
            <Grid size={{ md: 4 }}>
              <TextField
                id="mobileno"
                label="Mobile No"
                name="mobileNo"
                variant="outlined"
                autoComplete="off"
                fullWidth
                value={entity.mobileNo}
                onChange={handleEventChange}
                required
                size="small"
                onKeyDown={(e) => Number(e)}
                slotProps={{ htmlInput: { maxLength: 10 } }}
              ></TextField>
            </Grid>
            <Grid size={{ md: 4 }}>
              <TextField
                id="state"
                label="State"
                name="state"
                variant="outlined"
                autoComplete="off"
                fullWidth
                value={entity.state}
                onChange={handleEventChange}
                required
                size="small"
              ></TextField>
            </Grid>
            <Grid size={{ md: 4 }}>
              <TextField
                id="district"
                label="District"
                name="district"
                variant="outlined"
                autoComplete="off"
                value={entity.district}
                onChange={handleEventChange}
                fullWidth
                required
                size="small"
              ></TextField>
            </Grid>
            <Grid size={{ md: 4 }}>
              <TextField
                id="village"
                label="Village"
                name="village"
                variant="outlined"
                autoComplete="off"
                value={entity.village}
                onChange={handleEventChange}
                fullWidth
                required
                size="small"
              ></TextField>
            </Grid>
            <Grid size={{ md: 4 }}>
              <TextField
                id="bankname"
                label="Bank Name"
                name="bankName"
                variant="outlined"
                autoComplete="off"
                fullWidth
                value={entity.bankName}
                onChange={handleEventChange}
                required
                size="small"
              ></TextField>
            </Grid>
            <Grid size={{ md: 4 }}>
              <TextField
                id="branchname"
                label="Branch Name"
                name="branchName"
                variant="outlined"
                autoComplete="off"
                value={entity.branchName}
                onChange={handleEventChange}
                fullWidth
                required
                size="small"
              ></TextField>
            </Grid>
            <Grid size={{ md: 4 }}>
              <TextField
                id="branchcode"
                name="branchCode"
                label="Branch Code"
                variant="outlined"
                autoComplete="off"
                value={entity.branchCode}
                onChange={handleEventChange}
                fullWidth
                required
                size="small"
              ></TextField>
            </Grid>
            <Grid size={{ md: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="complaint-category-label" required>
                  Complaint Category
                </InputLabel>
                <Select
                  labelId="complaint-category-label"
                  id="complaint-category"
                  name="category"
                  label="Complaint Category"
                  value={entity.category}
                  onChange={handleEventChange}
                >
                  <MenuItem value="Reconciliation">Reconciliation</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ md: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="complaint-sub-category-label" required>
                  Complaint Sub Category
                </InputLabel>
                <Select
                  labelId="complaint-sub-category-label"
                  id="complaint-sub-category"
                  name="subCategory"
                  label="Complaint Sub Category"
                  value={entity.subCategory}
                  onChange={handleEventChange}
                >
                  <MenuItem value="Amount debited but not credited">Amount debited but not credited</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="case-type-label" required>
                  Case Type
                </InputLabel>
                <Select
                  labelId="case-type-label"
                  id="case-type"
                  name="caseType"
                  label="Case Type"
                  value={entity.caseType}
                  onChange={handleEventChange}
                >
                  <MenuItem value="incident">Incident</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="channel-label" required>
                  Channel
                </InputLabel>
                <Select
                  labelId="channel-label"
                  id="channel"
                  name="channel"
                  label="Channel"
                  value={entity.channel}
                  onChange={handleEventChange}
                >
                  <MenuItem value="web">Web</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ md: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="product-label" required>
                  Product
                </InputLabel>
                <Select
                  labelId="product-label"
                  id="product"
                  name="product"
                  label="Product"
                  value={entity.product}
                  onChange={handleEventChange}
                >
                  <MenuItem value="fi_bank">FI_BANK</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ md: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="component-name-label" required>
                  Component Name
                </InputLabel>
                <Select
                  labelId="component-name-label"
                  id="component-name"
                  name="componentName"
                  label="Component Name"
                  value={entity.componentName}
                  onChange={handleEventChange}
                >
                  <MenuItem value="technicalsupport">
                    Technical Support
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ md: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="status-label" required>
                  Status
                </InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  name="status"
                  label="Status"
                  value={entity.status}
                  onChange={handleEventChange}
                >
                  <MenuItem value="new">New</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ md: 8 }}>
              <TextField
                id="description"
                label="Description (Max lenght 256)"
                variant="outlined"
                name="discription"
                autoComplete="off"
                multiline
                value={entity.discription}
                onChange={handleEventChange}
                fullWidth
                required
                rows={3}
                maxRows={5}
              ></TextField>
            </Grid>
            <Grid size={{ md: 4 }} container>
              <Grid size={{ md: 12 }}>
                <TextField
                  type="file"
                  id="attachment"
                  variant="outlined"
                  autoComplete="off"
                  fullWidth
                  size="small"
                  value={entity.attachment}
                  onChange={handleEventChange}
                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={onResetEditComplaint}
                >
                  RESET
                </Button>
              </Grid>
              <Grid size={{ md: 6 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={onSubmitEditComplaint}
                >
                  SUBMIT
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
