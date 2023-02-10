import "./DashboardCard.css";
import React from "react";
import PieChartComponent from "../PieChart/PieChartComponent";
import BarChartComponent from "../BarChart/BarChartComponent";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function DashboardCard({
  title,
  by,
  data,
  onlyBar = false,
  numOfCustomers = false,
}) {
  const [chartType, setChartType] = React.useState(() =>
    onlyBar ? "bar" : "pie"
  );
  const [dataType, setDataType] = React.useState("sales");

  let dataLoaded = () => {
    return Object.keys(data).length < 2;
  };
  return (
    <div className="cardContainer">
      <Card sx={{ width: "524px", m: 2 }} className="cardDesign">
        <CardContent>
          <div className="containerPosition">
            <div className="headingContainer">
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <div>
                {onlyBar ? (
                  ""
                ) : (
                  <FormControl sx={{ mr: 1 }}>
                    <InputLabel id="demo-simple-select-label">Chart</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Age"
                      value={chartType}
                      onChange={(e) => {
                        setChartType(e.target.value);
                      }}
                    >
                      <MenuItem value={"pie"}>Pie</MenuItem>
                      <MenuItem value={"bar"}>Bar</MenuItem>
                    </Select>
                  </FormControl>
                )}

                <FormControl>
                  <InputLabel id="demo-simple-select-label">Data</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    value={dataType}
                    onChange={(e) => {
                      setDataType(e.target.value);
                    }}
                  >
                    <MenuItem value={"sales"}>Sales</MenuItem>
                    <MenuItem value={"numOfSales"}>Num of Sales</MenuItem>
                    {numOfCustomers ? (
                      <MenuItem value={"numOfCustomers"}>
                        Num of Customers
                      </MenuItem>
                    ) : (
                      ""
                    )}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="containerPosition">
              {dataLoaded() ? (
                ""
              ) : chartType === "pie" ? (
                <PieChartComponent
                  data={data[dataType]}
                  dataKey={"sales"}
                  nameKey={by}
                />
              ) : (
                <BarChartComponent
                  data={data[dataType]}
                  dataKey={"sales"}
                  nameKey={by}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
