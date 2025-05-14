import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import VisibilityIcon from "@mui/icons-material/Visibility";
import './editViewComplaint.css'

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
  abeName: "",
  complaintCategory: "",
  complaintSubCategory: "",
  caseType: "",
  channel: "",
  product: "",
  componentName: "",
  status: "",
  assignedTo: "",
  dependency: "",
  description: "",
  attachment: "",
};
export default function EditViewComplaint({ onCancel, title, rowData }) {
  const [entity, setEntity] = React.useState(
    rowData?.bcId ? rowData : initialState
  );

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
    } else if (entity.abeName === "") {
      alert("ABE Name is required");
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
    } else if (entity.assignedTo === "") {
      alert("Assigned To is required");
    } else if (entity.dependency === "") {
      alert("Dependency is required");
    } else if (entity.discription === "") {
      alert("Descriptions is required");
    } else {
      alert("Complaint Submitted Successfully");
    }
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
            <Typography variant="h6">{title} Complaint</Typography>
            <Typography variant="h6">Project Name: BANK</Typography>
            <Typography variant="h6">
              Ticket Number:{rowData.ticketNo}
            </Typography>
          </div>
          <Grid container spacing={2}>
            <Grid size={{ md: 4 }}>
              <TextField
                id="bcid"
                name="bcId"
                label="BC ID"
                variant="outlined"
                fullWidth
                value={entity.bcId}
                onChange={handleEventChange}
                required
                size="small"
                disabled={title === "View"}
              ></TextField>
            </Grid>
            <Grid size={{ md: 4 }}>
              <TextField
                id="bcname"
                label="BC Name"
                name="bcName"
                variant="outlined"
                fullWidth
                value={entity.bcName}
                onChange={handleEventChange}
                required
                size="small"
                disabled={title === "View"}
              ></TextField>
            </Grid>
            <Grid size={{ md: 4 }}>
              <TextField
                id="mobileno"
                label="Mobile No"
                name="mobileNo"
                variant="outlined"
                fullWidth
                value={entity.mobileNo}
                onChange={handleEventChange}
                required
                size="small"
                onKeyDown={(e) => Number(e)}
                slotProps={{ htmlInput: { maxLength: 10 } }}
                disabled={title === "View"}
              ></TextField>
            </Grid>
            <Grid size={{ md: 4 }}>
              <TextField
                id="state"
                label="State"
                name="state"
                variant="outlined"
                fullWidth
                value={entity.state}
                onChange={handleEventChange}
                required
                size="small"
                disabled={title === "View"}
              ></TextField>
            </Grid>
            <Grid size={{ md: 4 }}>
              <TextField
                id="district"
                label="District"
                name="district"
                variant="outlined"
                value={entity.district}
                onChange={handleEventChange}
                fullWidth
                required
                size="small"
                disabled={title === "View"}
              ></TextField>
            </Grid>
            <Grid size={{ md: 4 }}>
              <TextField
                id="village"
                label="Village"
                name="village"
                variant="outlined"
                value={entity.village}
                onChange={handleEventChange}
                fullWidth
                required
                size="small"
                disabled={title === "View"}
              ></TextField>
            </Grid>
            <Grid size={{ md: 4 }}>
              <TextField
                id="bankname"
                label="Bank Name"
                name="bankName"
                variant="outlined"
                fullWidth
                value={entity.bankName}
                onChange={handleEventChange}
                required
                size="small"
                disabled={title === "View"}
              ></TextField>
            </Grid>
            <Grid size={{ md: 4 }}>
              <TextField
                id="branchname"
                label="Branch Name"
                name="branchName"
                variant="outlined"
                value={entity.branchName}
                onChange={handleEventChange}
                fullWidth
                required
                size="small"
                disabled={title === "View"}
              ></TextField>
            </Grid>
            <Grid size={{ md: 4 }}>
              <TextField
                id="branchcode"
                name="branchCode"
                label="Branch Code"
                variant="outlined"
                value={entity.branchCode}
                onChange={handleEventChange}
                fullWidth
                required
                size="small"
                disabled={title === "View"}
              ></TextField>
            </Grid>
            <Grid size={{ md: 4 }}>
              <TextField
                id="branchcode"
                label="ABE Name"
                name="abeName"
                variant="outlined"
                value={entity.abeName}
                onChange={handleEventChange}
                fullWidth
                required
                size="small"
                disabled={title === "View"}
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
                  disabled={title === "View"}
                  value={entity.complaintCategory}
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
                  disabled={title === "View"}
                  value={entity.complaintSubCategory}
                  onChange={handleEventChange}
                >
                  <MenuItem value="Amount debited but not credited">
                    Amount debited but not credited
                  </MenuItem>
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
                  disabled={title === "View"}
                  value={entity.caseType}
                  onChange={handleEventChange}
                >
                  <MenuItem value="Incident">Incident</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ md: 2 }}>
              <FormControl required fullWidth size="small">
                <InputLabel id="channel-label">Channel</InputLabel>
                <Select
                  labelId="channel-label"
                  id="channel"
                  name="channel"
                  label="Channel"
                  disabled={title === "View"}
                  value={entity.channel}
                  onChange={handleEventChange}
                >
                  <MenuItem value="Web">Web</MenuItem>
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
                  disabled={title === "View"}
                  value={entity.product}
                  onChange={handleEventChange}
                >
                  <MenuItem value="FI_BANK">FI_BANK</MenuItem>
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
                  disabled={title === "View"}
                  value={entity.componentName}
                  onChange={handleEventChange}
                >
                  <MenuItem value="Technical support">
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
                  disabled={title === "View"}
                  value={entity.status}
                  onChange={handleEventChange}
                >
                  <MenuItem value="New">New</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ md: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="assigned-label" required>
                  Assigned To
                </InputLabel>
                <Select
                  labelId="assigned-label"
                  id="assignedTo"
                  name="assignedTo"
                  disabled={title === "View"}
                  label="Assigned To"
                  value={entity.assignedTo}
                  onChange={handleEventChange}
                >
                  <MenuItem value="santanug@integramicro.co.in">
                    Santanug@integramicro.co.in
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ md: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="dependency-label" required>
                  Dependency
                </InputLabel>
                <Select
                  labelId="dependency-label"
                  id="dependency"
                  name="dependency"
                  label="Dependency"
                  disabled={title === "View"}
                  value={entity.dependency}
                  onChange={handleEventChange}
                >
                  <MenuItem value="Dependency">Dependency One</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ md: 7.3}}>
              <TextField
                id="description"
                label="Description (Max lenght 256)"
                variant="outlined"
                name="description"
                disabled={title === "View"}
                value={entity.description}
                onChange={handleEventChange}
                fullWidth
                required
                multiline
                rows={3}
                maxRows={5}
              ></TextField>
            </Grid>
            <Grid size={{md:0.7}} className="visibility-Icon">
              <VisibilityIcon />
            </Grid>
            <Grid size={{ md: 4 }} container>
              <Grid size={{ md: 12 }}>
                <TextField
                  id="attachment"
                  type="file"
                  variant="outlined"
                  fullWidth
                  name="attachment"
                  disabled={title === "View"}
                  value={entity.attachment}
                  onChange={handleEventChange}
                  size="small"
                ></TextField>
              </Grid>
              {title === "Edit" && (
                <>
                  <Grid size={{ md: 6 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => onCancel()}
                    >
                      CANCEL
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
                </>
              )}
              {title === "View" && (
                <>
                  <Grid size={{ md: 12 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => onCancel()}
                    >
                      BACK
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
