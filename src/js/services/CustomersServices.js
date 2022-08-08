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
    CustomersServices.prototype.saveCustomer=async function(customer) {
      return await ServiceUtils.fetchData('customers','POST',customer);
    };

    CustomersServices.prototype.fetchCustomers=async function(){
      return await ServiceUtils.fetchData('customers');
    };

  return new CustomersServices;
});
