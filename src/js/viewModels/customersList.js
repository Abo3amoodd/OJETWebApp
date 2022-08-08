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
    'ojs/ojtranslation',
    'ojs/ojarraydataprovider',
    'services/CustomersServices',
    'knockout',
    'ojs/ojbootstrap',
    'ojs/ojmodule-element-utils',
    '../accUtils',
    'utils/Service',
    'ojs/ojknockout-keyset',
    'ojs/ojprogress-circle',
    'ojs/ojavatar',
    'ojs/ojbutton',
    'ojs/ojlistview',
    'ojs/ojlistitemlayout',
], function (
    Translations,
    ArrayDataProvider,
    CustomersServices,
    ko,
    Bootstrap,
    ModuleElementUtils,
    accUtils,
    ServiceUtils,
    ojknockout_keyset_1
) {
    function CustomersListViewModel(params) {
        this._initIds();
        this._initObservables();
        this._initVariables();
        this._initCustomersData();

        this.onAddButton = (e) => {
            const {
                router
            } = params;
            // console.log('add event',event);
            router.go({
                path: 'customers',
                params: {
                    id: 'Create'
                }
            });
        };

        this.onEditButton = (e, context) => {
            const {
                router
            } = params;
            // var detailsID=context.data.id;
            router.go({
                path: 'customers',
                params: {
                    id: 'Edit',
                    customerId: context.data.id,
                    firstName: context.data.firstName,
                    lastName: context.data.lastName,
                    birthday: context.data.birthday,
                    avatar: context.data.avatar,
                    country: context.data.country,
                    state: context.data.state,
                    email: context.data.email,
                },
            });
        };

        this.onDeleteButton = (context) => {
          //  this.customerId(e.detail.value);
            document.getElementById(this.deleteCustomerDialogId).open();
        };

        this.handleSelectedChanged = (event) => {
            this.selectedIds(this.getDisplayValue(event.detail.value)); // show selected list item elements' ids
        };
    }
    CustomersListViewModel.prototype.getDisplayValue = function (set) {
        return JSON.stringify(Array.from(set.values()));
    };

    CustomersListViewModel.prototype._initIds = function () {
        this.deleteCustomerDialogId = 'delete-customer-dialog-id';
    };

    CustomersListViewModel.prototype._initObservables = function () {
        this.customersData = ko.observableArray([]);
        this.selectedItems = new ojknockout_keyset_1.ObservableKeySet();
        this.selectedSelectionRequired = ko.observable(false);
        this.firstSelectedItem = ko.observable();
        this.selectedIds = ko.observable();
    };

    CustomersListViewModel.prototype._initVariables = function () {
        this.customersDataProvider = new ArrayDataProvider(this.customersData);
        this.deleteCustomerDialog = ModuleElementUtils.createConfig({
            name: 'dialogs/deleteCustomer',
            params: {
            deleteCustomerDialogId: this.deleteCustomerDialogId,
            },
        });
    };

    CustomersListViewModel.prototype._initCustomersData = async function () {
        let dataFromService;
        try {
            dataFromService = await CustomersServices.fetchCustomers();
        } catch (error) {
            console.log(error);
        }

        if (dataFromService) {
            const customerSrc = dataFromService.map((customer) => {
                customer.id = `client-${customer.id}`;
                customer.id = ko.observable(customer.id);
                return customer;
            });
            this.customersData(customerSrc);
            //  console.log(this.customersData());
        }
    };

    return CustomersListViewModel;
});