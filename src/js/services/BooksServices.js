/**
 * books service abstraction
 */
define(['utils/Service'], function (ServiceUtils) {
  function BooksServices() {}
  /**
   * @description A singleton to hold the variable we want
   * generate a unique id by calling the generateUniqueID function
   * @returns The existing instance
   */
  BooksServices.prototype.fetchBooks = async function () {
    return await ServiceUtils.fetchData('books', 'GET');
  };


  return new BooksServices;
});