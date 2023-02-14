import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { formatDate } from "../../utils/helpers";

let crmApi = createApi({
  reducerPath: "crm",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/" }),
  endpoints: (builder) => {
    return {
      getCustomers: builder.query({
        query: () => {
          return {
            url: "customers/get/all",
            method: "GET",
          };
        },
        providesTags: ["Customers"],
      }),
      addCustomer: builder.mutation({
        query: (person) => {
          let formattedDate = formatDate(person.birthdate);

          let formData = new FormData();
          formData.append("first_name", person.firstname);
          formData.append("last_name", person.lastname);
          formData.append("birthdate", formattedDate);
          formData.append("email", person.email);
          formData.append("street", person.street);
          formData.append("city", person.city);
          formData.append("zip", person.zip);
          formData.append("region", person.region);

          return {
            url: "customers/add",
            method: "POST",
            body: formData,
          };
        },
        invalidatesTags: ["Customers"],
      }),
      getSales: builder.query({
        query: () => {
          return {
            url: "sales/get",
            method: "GET",
          };
        },
        providesTags: ["Sales"],
      }),
      addSale: builder.mutation({
        query: (sale) => {
          let formData = new FormData();
          formData.append("cust_id", sale.customer);
          formData.append("salesman_id", sale.seller);
          formData.append("category", sale.productCat);
          formData.append("sales", sale.amount);
          return {
            url: "sales/add",
            method: "POST",
            body: formData,
          };
        },
        invalidatesTags: ["Sales"],
      }),
      getSalesman: builder.query({
        query: () => {
          return {
            url: "salesman/get/all",
            method: "GET",
          };
        },
      }),
      getRegions: builder.query({
        query: () => {
          return {
            url: "regions/get",
            method: "GET",
          };
        },
      }),
      getProductCategories: builder.query({
        query: () => {
          return {
            url: "categories/get",
            method: "GET",
          };
        },
      }),
      getSalesByCategory: builder.query({
        query: () => {
          return { url: "dashboard/sales/cat", method: "GET" };
        },
      }),
      getNumByCategory: builder.query({
        query: () => {
          return { url: "dashboard/num/cat", method: "GET" };
        },
      }),
      getSalesByCustomer: builder.query({
        query: () => {
          return { url: "dashboard/sales/customer", method: "GET" };
        },
      }),
      getNumByCustomer: builder.query({
        query: () => {
          return { url: "dashboard/num/customer", method: "GET" };
        },
      }),
      getSalesBySalesman: builder.query({
        query: () => {
          return { url: "dashboard/sales/seller", method: "GET" };
        },
      }),
      getNumBySalesman: builder.query({
        query: () => {
          return { url: "dashboard/num/seller", method: "GET" };
        },
      }),
    };
  },
});

export let {
  useGetCustomersQuery,
  useAddCustomerMutation,
  useGetSalesQuery,
  useAddSaleMutation,
  useGetRegionsQuery,
  useGetSalesmanQuery,
  useGetProductCategoriesQuery,
  useGetNumByCategoryQuery,
  useGetNumByCustomerQuery,
  useGetNumBySalesmanQuery,
  useGetSalesByCategoryQuery,
  useGetSalesByCustomerQuery,
  useGetSalesBySalesmanQuery,
} = crmApi;
export { crmApi };
