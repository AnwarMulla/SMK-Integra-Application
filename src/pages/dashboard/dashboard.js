import React from "react";
import { Card, CardContent, Grid } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import Typography from "@mui/material/Typography";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
const size = {
  width: 450,
  height: 180,
};

export const desktopOS = [
  {
    label: "New",
    value: 19,
    color: "#ffbb28",
  },
  {
    label: "Reopened",
    value: 0,
    color: "#c8a0be",
  },
  {
    label: "In Progress",
    value: 0,
    color: "#0064c8",
  },
  {
    label: "Closed",
    value: 2.42,
    color: "#00c49f",
  },
  {
    label: "Verified & Closed",
    value: 79,
    color: "#ff8042",
  },
];

const data = {
  data: desktopOS,
};
const chartSetting = {
  yAxis: [
    {
      label: "Counts",
    },
  ],
};

export default function Dashboard() {
  return (
    <>
      <Grid container spacing={1} padding={1}>
        <Grid size={{ md:2 }}>
          <Card sx={{ bgcolor: "#0088fe", color: "white", height: "120px" }}>
            <CardContent>
              <Typography variant="h3">6840</Typography>
              <Typography variant="p">Total Tickets</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ md:2 }}>
          <Card sx={{ bgcolor: "#ffbb28", color: "white", height: "120px" }}>
            <CardContent>
              <Typography variant="h3">1307</Typography>
              <Typography variant="p">New Tickets</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ md:2 }}>
          <Card sx={{ bgcolor: "#c8a0be", color: "white", height: "120px" }}>
            <CardContent>
              <Typography variant="h3">6</Typography>
              <Typography variant="p">Reopened Tickets</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ md:2 }}>
          <Card sx={{ bgcolor: "#0064c8", color: "white", height: "120px" }}>
            <CardContent>
              <Typography variant="h3">5</Typography>
              <Typography variant="p">In Progress Tickets</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ md:2 }}>
          <Card sx={{ bgcolor: "#00c49f", color: "white", height: "120px" }}>
            <CardContent>
              <Typography variant="h3">136</Typography>
              <Typography variant="p">Closed Tickets</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ md:2 }}>
          <Card sx={{ bgcolor: "#ff8042", color: "white", height: "120px" }}>
            <CardContent>
              <Typography variant="h3">5386</Typography>
              <Typography variant="p">Verified & Closed Tickets</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ md:3 }}>
          <Card sx={{ bgcolor: "#ea797c", color: "white" , height: "140px" }}>
            <CardContent>
              <Typography variant="h3">2932</Typography>
              <Typography variant="p">
                TOTAL TICKETS CLOSED WITHIN SLA'S
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ md:3 }}>
          <Card sx={{ bgcolor: "#f7797c", color: "white" , height: "140px" }}>
            <CardContent>
              <Typography variant="h3">1613</Typography>
              <Typography variant="p">
                TOTAL TICKETS CLOSED OUT OF SLA'S
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ md:3 }}>
          <Card sx={{ bgcolor: "#ea797c", color: "white" , height: "140px" }}>
            <CardContent>
              <Typography variant="h3">0</Typography>
              <Typography variant="p">
                TOTAL TICKETS STILL OPEN BUT WITHIN SLA'S
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ md:3 }}>
          <Card sx={{ bgcolor: "#ea797c", color: "white" , height: "140px" }}>
            <CardContent>
              <Typography variant="h3">1357</Typography>
              <Typography variant="p">
                TOTAL TICKETS STILL OPEN BUT OUT OF SLA'S
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ md:6 }}>
          <Card sx={{ width: "100%" }}>
            <CardContent sx={{ display: "flex", alignContent: "center" }}>
              <BarChart
                xAxis={[
                  {
                    label: "Tickets",
                    scaleType: "band",
                    data: [
                      "Total",
                      "New",
                      "Reopened",
                      "In Progress",
                      "Closed",
                      "Verified & Closed",
                    ],
                  },
                ]}
                {...chartSetting}
                series={[{ data: [8000, 2000, 0, 0, 500, 5000] }]}
                width={600}
                height={180}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ md:6 }}>
          <Card>
            <CardContent>
              <PieChart
                series={[
                  {
                    arcLabel: (item) => `${item.value}%`,
                    arcLabelMinAngle: 30,
                    arcLabelRadius: "50%",
                    ...data,
                  },
                ]}
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fontWeight: "bold",
                  },
                }}
                {...size}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
