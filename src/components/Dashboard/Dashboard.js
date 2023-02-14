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
import {
  useGetCustomersQuery,
  useGetNumByCategoryQuery,
  useGetNumByCustomerQuery,
  useGetNumBySalesmanQuery,
  useGetSalesByCategoryQuery,
  useGetSalesByCustomerQuery,
  useGetSalesBySalesmanQuery,
  useGetSalesmanQuery,
} from "../../store/api/crmApi";
import { useSelector } from "react-redux";

export default function Dashboard() {
  let { openDrawer } = useSelector((state) => state.headerMenu);

  // PreLoad all
  let { data: allCustomers } = useGetCustomersQuery();
  let { data: allSalesman } = useGetSalesmanQuery();

  let { data: catNum } = useGetNumByCategoryQuery();
  let { data: salesmanNum } = useGetNumBySalesmanQuery();
  let { data: customerNum } = useGetNumByCustomerQuery();
  let { data: catSales } = useGetSalesByCategoryQuery();
  let { data: salesmanSales } = useGetSalesBySalesmanQuery();
  let { data: customerSales } = useGetSalesByCustomerQuery();

  const getCustomername = (id) => {
    if (allCustomers) {
      let customer = allCustomers.filter((customer) => id === customer.pk);
      if (customer.length === 1) {
        return (
          customer[0].fields.first_name[0] + ". " + customer[0].fields.last_name
        );
      } else {
        return "";
      }
    }
  };

  const getSalesmanname = (id) => {
    if (allSalesman) {
      let salesman = allSalesman.filter((seller) => id === seller.pk);
      if (salesman.length === 1) {
        return (
          salesman[0].fields.first_name[0] + ". " + salesman[0].fields.last_name
        );
      } else {
        return "";
      }
    }
  };

  let byCat = {
    sales: [],
    numOfSales: [],
  };

  let bySeller = {
    sales: [],
    numOfSales: [],
  };
  let byCustomer = {
    sales: [],
    numOfSales: [],
  };

  if (catNum && catSales) {
    byCat.numOfSales = catNum;
    byCat.sales = catSales;
  }

  if (salesmanNum && salesmanSales && allSalesman) {
    let salesmanNumWithNames = [];
    for (const salesman of salesmanNum) {
      let newOne = {
        ...salesman,
        salesPerson: getSalesmanname(salesman.salesPerson),
      };

      salesmanNumWithNames.push(newOne);
    }

    let salesmanSalesWithNames = [];
    for (const salesman of salesmanSales) {
      let newOne = {
        ...salesman,
        salesPerson: getSalesmanname(salesman.salesPerson),
      };
      salesmanSalesWithNames.push(newOne);
    }

    bySeller.numOfSales = salesmanNumWithNames;
    bySeller.sales = salesmanSalesWithNames;
  }

  if (customerNum && customerSales && allCustomers) {
    let customerNumWithNames = [];
    for (const customer of customerNum) {
      let newOne = {
        ...customer,
        customer: getCustomername(customer.customer),
      };
      customerNumWithNames.push(newOne);
    }

    let customerSalesWithNames = [];
    for (const customer of customerSales) {
      let newOne = {
        ...customer,
        customer: getCustomername(customer.customer),
      };
      customerSalesWithNames.push(newOne);
    }

    byCustomer.numOfSales = customerNumWithNames;
    byCustomer.sales = customerSalesWithNames;
  }

  return (
    <div className="flex">
      <h1 className="center">Customer Dashboard</h1>
      <div className={openDrawer ? "container-open" : "container-closed"}>
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
