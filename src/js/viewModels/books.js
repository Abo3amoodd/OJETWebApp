/**
 * @license
 * Copyright (c) 2014, 2022, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your incidents ViewModel code goes here
 */
define([
  'ojs/ojarraydataprovider',
  'services/BooksServices',
  'knockout',
  'ojs/ojmodule-element-utils',
  'ojs/ojprogress-circle',
  'ojs/ojavatar',
  'custom-book/loader',
], function (ArrayDataProvider, BooksServices, ko, ModuleElementUtils) {
  function BooksViewModel() {

    this._initIds();
    this._initObservables();
    this._initVariables();
    this._initBooksData();

    this.bookClick = (e) => {};

    this.bookAddedToList = (e) => {
      this.bookId(e.detail.value);
      const currentBook = this.booksData().find((book) => book.id === this.bookId());
      if (!currentBook) return;
      if (currentBook.heartColor() === BooksViewModel.COLORS.red) {
        currentBook.heartColor(null);
        return;
      }
      document.getElementById(this.favoritesDialogId).open();
    };

  }
  BooksViewModel.prototype._initIds = function () {
    this.favoritesDialogId = 'favorites-dialog-id';
  };

  BooksViewModel.COLORS = {
    red: 'red',
  }

  BooksViewModel.prototype._initObservables = function () {
    this.isLoading = ko.observable(true);
    this.bookId = ko.observable(null);
    this.booksData = ko.observableArray([]);
    this.listData = ko.observableArray([{
      value: 1,
      label: 'My favorite books'

    }]);
  };

  BooksViewModel.prototype._initVariables = function () {
    this.booksDataProvider = new ArrayDataProvider(this.booksData);
    this.favoritesDialog = ModuleElementUtils.createConfig({
      name: 'dialogs/favorites',
      params: {
        favoritesDialogId: this.favoritesDialogId,
        listData: this.listData,
        changeColorCallback: this._changeColor.bind(this, this.bookId),
      },
    });
  };
  BooksViewModel.prototype._initBooksData = async function () {
    let dataFromService;
    try {
      dataFromService = await BooksServices.fetchBooks();
    } catch (error) {
      console.log(error);
    }
    if (dataFromService) {
      const bookSrc = dataFromService.map((book) => {
        book.id = `book-custom-${book.id}`;
        book.heartColor = ko.observable(null);
        return book;
      });
      this.booksData(bookSrc);
    //  console.log(this.booksData());

      this.isLoading(false);
    }
  };

  BooksViewModel.prototype._changeColor = function (bookId) {
    const currentBook = this.booksData().find((book) => book.id === bookId());
    if (!currentBook) return;
    currentBook.heartColor(BooksViewModel.COLORS.red);
    //  console.log('change color');

  };


  return BooksViewModel;
});