/**
 * Customers service abstraction
 */
define(['utils/Service'], function (ServiceUtils) {
  function CustomersServices() {}
  /**
   * @description A singleton to hold the variable we want
   * generate a unique id by calling the generateUniqueID function
   * @returns The existing instance
   */
  CustomersServices.prototype.saveCustomer = async function (customer) {
    return await ServiceUtils.fetchData('customers', 'POST', customer);
  };

  CustomersServices.prototype.fetchCustomers = async function (customerName,pageNumber) {
    if (customerName == null) {
      if(pageNumber==null){
        return await ServiceUtils.fetchData('customers', 'GET',null,pageNumber);
      }
      else{
        return await ServiceUtils.fetchData('customers', 'GET',null, pageNumber);

      }
    } else {
        return await ServiceUtils.fetchData('customers', 'GET', customerName, pageNumber);
    }

  };

  CustomersServices.prototype.deleteCustomer = async function (customerID) {
    return await ServiceUtils.fetchData('customers', 'DELETE', customerID);
  };

  return new CustomersServices;
});