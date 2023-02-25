let BASE_URL = "https://crm.niklasburg-kanban.de";

export async function getCustomers() {
  let customers = await fetch(BASE_URL + "customers/get/all", {
    method: "GET",
  });
  customers = await customers.json();
  return customers;
}

export async function saveCustomer(person) {
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

  let customer = await fetch(BASE_URL + "customers/add", {
    method: "POST",
    body: formData,
  });
  customer = await customer.json();
  return customer;
}

let formatDate = (date) => {
  var date = new Date(date);
  let formattedDate =
    (date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) +
    "/" +
    (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
    "/" +
    date.getFullYear();
  return formattedDate;
};

export async function getRegions() {
  let regions = await fetch(BASE_URL + "regions/get", {
    method: "GET",
  });
  regions = await regions.json();
  return regions;
}

export async function getProductCategories() {
  let categories = await fetch(BASE_URL + "categories/get", {
    method: "GET",
  });
  categories = await categories.json();
  return categories;
}

export async function getSalesman() {
  let salesman = await fetch(BASE_URL + "salesman/get/all", {
    method: "GET",
  });
  salesman = await salesman.json();
  return salesman;
}

export async function saveSale(sale) {
  let formData = new FormData();
  formData.append("cust_id", sale.customer);
  formData.append("salesman_id", sale.seller);
  formData.append("category", sale.productCat);
  formData.append("sales", sale.amount);

  let saleResponse = await fetch(BASE_URL + "sales/add", {
    method: "POST",
    body: formData,
  });
  saleResponse = await saleResponse.json();
  return saleResponse;
}

export async function getSales() {
  let sales = await fetch(BASE_URL + "sales/get", {
    method: "GET",
  });
  sales = await sales.json();
  return sales;
}

export async function getCustomer(id) {
  let customer = await fetch(BASE_URL + "customers/get?cust_id=" + id, {
    method: "GET",
  });
  customer = await customer.json();
  return customer;
}

export async function getSeller(id) {
  let seller = await fetch(BASE_URL + "salesman/get?salesman_id=" + id, {
    method: "GET",
  });
  seller = await seller.json();
  return seller;
}

export async function getSalesByCategory() {
  let sales = await fetch(BASE_URL + "dashboard/sales/cat", {
    method: "GET",
  });
  sales = await sales.json();
  return sales;
}

export async function getNumByCategory() {
  let numOfSales = await fetch(BASE_URL + "", {
    method: "GET",
  });
  numOfSales = await numOfSales.json();
  return numOfSales;
}
export async function getSalesByCustomer() {
  let sales = await fetch(BASE_URL + "dashboard/sales/customer", {
    method: "GET",
  });
  sales = await sales.json();
  return sales;
}

export async function getNumByCustomer() {
  let numOfSales = await fetch(BASE_URL + "dashboard/num/customer", {
    method: "GET",
  });
  numOfSales = await numOfSales.json();
  return numOfSales;
}

export async function getSalesBySalesman() {
  let sales = await fetch(BASE_URL + "dashboard/sales/seller", {
    method: "GET",
  });
  sales = await sales.json();
  return sales;
}

export async function getNumBySalesman() {
  let numOfSales = await fetch(BASE_URL + "dashboard/num/seller", {
    method: "GET",
  });
  numOfSales = await numOfSales.json();
  return numOfSales;
}
