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
    define(['ojs/ojtranslation',
            'knockout',
            'ojs/ojarraydataprovider',
            'ojs/ojavatar',
            'ojs/ojgauge',
            'ojs/ojdialog',
            'ojs/ojselectsingle'
        ],
        function (Translations,
            ko,
            ArrayDataProvider) {

            const _t = Translations.getTranslatedString;

            function CustomBookViewModel(context) {
                this._initIds();

                this._initLabels();

                this._initObservables();

                this._initVariables(context);


                this.element = context.element;
                this.context = context;
                this.onClick = this._onClick.bind(this);

                this.handleAddToList = this._handleAddToList.bind(this);

                this.handleAddToCart = this._handleAddToCart.bind(this);

            }

            CustomBookViewModel.prototype._initLabels = function () {

                this.addToCartLabel = _t('buttons.addToCart');

                this.addToListLabel = _t('buttons.addToList');

            };

            CustomBookViewModel.prototype._initIds = function () {


            };

            CustomBookViewModel.prototype._initVariables = function (context) {

                this.bookTitle = context.properties.bookTitle;

            };

            CustomBookViewModel.prototype._initObservables = function () {

                this.inputListValue = ko.observable(null);
                this.listData = ko.observableArray([{
                    value: 1,
                    label: 'My favorite books'

                }]);
                this.heartColor = ko.observable(null);

            };

            CustomBookViewModel.prototype._handleAddToCart = function (e) {

            };

            CustomBookViewModel.prototype._handleAddToList = function () {
                const params = {
                    bubbles: true,
                    detail: {
                        value: this.context.properties.bookId
                    },
                };
                this.element.dispatchEvent(new CustomEvent('addedToList', params));


            };

            CustomBookViewModel.prototype._onClick = function () {
                const params = {
                    bubbles: true,
                    detail: {
                        value: this.context.properties.bookId
                    },
                };
                this.element.dispatchEvent(new CustomEvent('bookClick', params));
            };


            return CustomBookViewModel;

        }
    );