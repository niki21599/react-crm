import React, { useEffect } from "react";
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
import DashboardCard from "../DashboardCard/DashboardCard";
import {
  getSalesByCategory,
  getNumByCategory,
  getSalesByCustomer,
  getNumByCustomer,
  getSalesBySalesman,
  getNumBySalesman,
  getCustomers,
  getSalesman,
} from "../../api/apiCalls";

import "./DashBoard.css";
import { Api } from "@mui/icons-material";

export default function Dashboard() {
  // Give the data in ordered form back, Looks better in barChart

  const [byCat, setByCat] = React.useState({});
  const [bySeller, setBySeller] = React.useState({});
  const [byCustomer, setByCustomer] = React.useState({});
  const [allCusomters, setAllCustomers] = React.useState([]);
  const [allSalesman, setAllSalesman] = React.useState([]);
  const [reload, setReload] = React.useState(false);

  useEffect(() => {
    // Get Category Data
    getSalesByCategory().then((data) => {
      byCat.sales = data;

      setByCat({ ...byCat });
    });
    getNumByCategory().then((data) => {
      byCat.numOfSales = data;
      setByCat({ ...byCat });
    });
    // Get Seller Data
    getSalesBySalesman().then((data) => {
      for (const salesman of data) {
        salesman.salesPerson = getSalesmanname(salesman.salesPerson);
      }

      bySeller.sales = data;

      setBySeller({ ...bySeller });
    });

    getNumBySalesman().then((data) => {
      for (const salesman of data) {
        salesman.salesPerson = getSalesmanname(salesman.salesPerson);
      }

      bySeller.numOfSales = data;

      setBySeller({ ...bySeller });
    });

    // Get Customer Data
    getSalesByCustomer().then((data) => {
      for (const customer of data) {
        customer.customer = getCustomername(customer.customer);
      }
      byCustomer.sales = data;
      setByCustomer({ ...byCustomer });
    });

    getNumByCustomer().then((data) => {
      for (const customer of data) {
        customer.customer = getCustomername(customer.customer);
      }
      byCustomer.numOfSales = data;
      setByCustomer({ ...byCustomer });
    });
  }, [reload]);

  useEffect(() => {
    getCustomers().then((customers) => {
      setAllCustomers(customers);
      setReload(!reload);
    });

    getSalesman().then((salesman) => {
      setAllSalesman(salesman);
      setReload(!reload);
    });
  }, []);

  const getCustomername = (id) => {
    let customer = allCusomters.filter((customer) => id === customer.pk);
    if (customer.length === 1) {
      return (
        customer[0].fields.first_name[0] + ". " + customer[0].fields.last_name
      );
    } else {
      return "";
    }
  };

  const getSalesmanname = (id) => {
    let salesman = allSalesman.filter((seller) => id === seller.pk);
    if (salesman.length === 1) {
      return (
        salesman[0].fields.first_name[0] + ". " + salesman[0].fields.last_name
      );
    } else {
      return "";
    }
  };
  return (
    <div className="flex">
      <h1 className="center">Customer Dashboard</h1>
      <div className="container">
        <DashboardCard
          title={"Sells by Salesman"}
          by={"salesPerson"}
          data={bySeller}
        />
        <DashboardCard
          title={"Sells by Category"}
          by={"productCategory"}
          data={byCat}
        />
        <DashboardCard
          title={"Our best 5 Customers"}
          by={"customer"}
          data={byCustomer}
          onlyBar
        />
      </div>
    </div>
  );
}
