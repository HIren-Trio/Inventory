export const apiRoutes = {
  // AUTH
  register: "user/register",
  login: "user/login",

  //Inventory
  getallinventory: "inventory/getAll/",
  addInventory: "inventory/add/",
  deleteInventory: "inventory/delete/",
  updateInventory: "inventory/update/",
  //Customer
  getallcustomer: "customer/getall/",
  customerlogin: "customer/login",
  addCustomer: "customer/add/",

  //order
  getallOrder: "order/getall/",
  deleteproductfromorder: "order/removeproduct/",
  changestatus: "order/changestatus/",
  getallOrderByCustomerId: "order/getallbycustomerid/",
  addOrder : "order/add/",

  // Notification 
  getAllNotification : "notification/"
};