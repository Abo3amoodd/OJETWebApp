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
    'utils/Core',
    'ojs/ojcontext',
    'ojs/ojprogress-circle',
    'ojs/ojprogress-bar',
    'ojs/ojavatar',
    'ojs/ojbutton',
    'ojs/ojlistview',
    'ojs/ojdialog',
    'ojs/ojrefresher',
    'ojs/ojlistitemlayout',
    'ojs/ojinputsearch'
], function (
    Translations,
    ArrayDataProvider,
    CustomersServices,
    ko,
    Bootstrap,
    ModuleElementUtils,
    accUtils,
    ServiceUtils,
    ojknockout_keyset_1,
    CoreUtils,
    Context
) {
    const _t = Translations.getTranslatedString;
    // var currentPageNumber=1;

    function CustomersListViewModel(params) {
        this._initIds();
        this._initLabels();
        this._initObservables();
     // this._initCustomersData();
        this._showCustomers();
        this._initCustomersSuggestions();
        this._initVariables();
        this.handleCloseDialog = this._handleCloseDialog.bind(this);
        this.beforeDeleteCustomerDialogClose = this._beforeDeleteCustomerDialogClose.bind(this);







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

        this.onPreviousButton = async (e) => {

            this.currentPageNumber(this.currentPageNumber() - 1);
            //console.log(this.isOnFirstPage());
            if (this.currentPageNumber() == 1) {
                this.isOnFirstPage(true);
            } else {
                this.isOnFirstPage(false);
            }
            if (this.currentPageNumber() >= this.pagesNumber()) {
                this.isOnLastPage(true);
            } else {
                this.isOnLastPage(false);
            }

            let dataFromService;
            try {
                dataFromService = await CustomersServices.fetchCustomers(null, this.currentPageNumber());
            } catch (error) {
                //console.log(error);
            }

            if (dataFromService) {
                const customerSrc = dataFromService.map((customer) => {
                    //customer.id = `client-${customer.id}`;
                    customer.id = ko.observable(customer.id);
                    return customer;
                });
                this.customersData(customerSrc);
            }
        };
        this.onNextButton = async (e) => {
            this.currentPageNumber(this.currentPageNumber() + 1);
            //  console.log(this.isOnFirstPage());
            if (this.currentPageNumber() == 1) {
                this.isOnFirstPage(true);
            } else {
                this.isOnFirstPage(false);
            }
            if (this.currentPageNumber() == 22) {
                this.isOnLastPage(true);
            } else {
                this.isOnLastPage(false);
            }
            let dataFromService;
            try {
                dataFromService = await CustomersServices.fetchCustomers(null, this.currentPageNumber());
            } catch (error) {
                //console.log(error);
            }

            if (dataFromService) {
                const customerSrc = dataFromService.map((customer) => {
                    //customer.id = `client-${customer.id}`;
                    customer.id = ko.observable(customer.id);
                    return customer;
                });
                this.customersData(customerSrc);
            }

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

        this.onDeleteButton = async (event, context) => {
            document.getElementById(this.deleteCustomerDialogId).open();
        };
        this.onConfirmDeleteButton = async (event, context) => {
            document.getElementById(this.deleteCustomerDialogId).close();
            let dataFromService;
            try {
                dataFromService = await CustomersServices.deleteCustomer(this.deletedCustomerId());
            } catch (error) {
                this.messageDataProvider(
                    new ArrayDataProvider([{
                        severity: 'error',
                        detail: error.message,
                        timestamp: new Date().toISOString(),
                        autoTimeout: CoreUtils.getAutoTimeout(),
                    }, ])
                );
            }
            const {
                router
            } = params;
            // console.log('add event',event);
            router.go({
                path: 'customersList',
                params: {
                    id: 'List'
                }
            });
        };

        this.handleSelectedChanged = (event) => {

            this.selectedIds(this.getDisplayValue(event.detail.value));
            //console.log(this.firstSelectedItem().data);
            try {
                this.deletedCustomerId(this.firstSelectedItem().data.id());
            } catch (error) {
                // console.log(error);
            }

        };

        this.handleValueAction = async (event) => {
            const detail = event.detail;
            const eventTime = this._getCurrentTime();
            this.searchTerm(detail.value);
            console.log(this.searchTerm());
            this.searchItemContext(this._trimItemContext(detail.itemContext));
            this.previousSearchTerm(detail.previousValue);
            this.searchTimeStamp(eventTime);
            let dataFromService;
            try {
                dataFromService = await CustomersServices.fetchCustomers(this.searchTerm(), this.currentPageNumber());
            } catch (error) {
                //console.log(error);
            }

            if (dataFromService) {
                const customerSrc = dataFromService.map((customer) => {
                    //customer.id = `client-${customer.id}`;
                    customer.id = ko.observable(customer.id);
                    return customer;
                });
                this.customersData(customerSrc);
            }
        };
        this._trimItemContext = (itemContext) => {
            let searchItemContext = null;
            if (itemContext) {
                searchItemContext = {
                    key: itemContext.key,
                    data: itemContext.data,
                };
                if (itemContext.metadata) {
                    searchItemContext.metadata = {
                        key: itemContext.metadata.key,
                    };
                }
            }
            return searchItemContext ? JSON.stringify(searchItemContext) : "";
        };
        this._getCurrentTime = () => {
            const date = new Date();
            return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
        };

    }

    CustomersListViewModel.prototype._showCustomers = function () {
        const busyContext = Context.getPageContext().getBusyContext();
        const resolveBusyState = busyContext.addBusyState({
            description: "Fetching customers",
        });
        return new Promise(function (resolve, reject) {
                window.setTimeout(function(){
                resolve();
                }, 1000);

            }).then(()=> {
            this._initCustomersData();
            this.customersLoaded(false);
            resolveBusyState();
        });


    };
        CustomersListViewModel.prototype._showCustomers = function () {
        const busyContext = Context.getPageContext().getBusyContext();
        const resolveBusyState = busyContext.addBusyState({
            description: "Fetching customers",
        });
        return new Promise(function (resolve, reject) {
                window.setTimeout(function(){
                resolve();
                }, 4000);

            }).then(()=> {
            this._initCustomersData();
            this.customersLoaded(false);
            resolveBusyState();
        });


    };


    CustomersListViewModel.prototype._initLabels = function () {

        this.deleteCustomerDialogTitle = _t('headers.deleteCustomerDialogTitle');

        this.deleteCustomerLabel = _t('buttons.deleteCustomer');

        this.closeDialogLabel = _t('buttons.closeDialog');
    };


    CustomersListViewModel.prototype.getDisplayValue = function (set) {
        return JSON.stringify(Array.from(set.values()));
    };

    CustomersListViewModel.prototype._initIds = function () {
        this.deleteCustomerDialogId = 'delete-customer-dialog-id';

    };

    CustomersListViewModel.prototype._initObservables = function () {
        this.customersData = ko.observableArray([]);
        this.searchedCustomersData = ko.observableArray([]);
        this.employees = ko.observableArray();
        this.selectedItems = new ojknockout_keyset_1.ObservableKeySet();
        this.selectedSelectionRequired = ko.observable(false);
        this.firstSelectedItem = ko.observable();
        this.selectedIds = ko.observable();
        this.deletedCustomerId = ko.observable();
        this.customerId = ko.observable(null);
        this.messageDataProvider = ko.observable(new ArrayDataProvider([]));



        this.value = ko.observable();
        this.rawValue = ko.observable();
        this.searchTerm = ko.observable();
        this.searchItemContext = ko.observable();
        this.previousSearchTerm = ko.observable();
        this.searchTimeStamp = ko.observable();

        this.currentPageNumber = ko.observable(1);
        this.pagesNumber = ko.observable();

        this.isOnFirstPage = ko.observable(true);
        this.isOnLastPage = ko.observable(false);

        this.progressValue = ko.observable(0);
        this.customersLoaded = ko.observable(true);
    };

    CustomersListViewModel.prototype._initVariables = function () {
        this.customersDataProvider = new ArrayDataProvider(this.customersData, {
            keyAttributes: "id"
        });
        this.searchedCustomersDataProvider = new ArrayDataProvider(this.searchedCustomersData, {
            keyAttributes: "id"
        });

    };


    CustomersListViewModel.prototype._beforeDeleteCustomerDialogClose = function () {

        //  this.inputListValue(null);
        
    };
    CustomersListViewModel.prototype._initCustomersData = async function () {
        let dataFromService;
        try {
            dataFromService = await CustomersServices.fetchCustomers(null, this.currentPageNumber);
        } catch (error) {
            //  console.log(error);
        }

        if (dataFromService) {
            const customerSrc = dataFromService.map((customer) => {
                //customer.id = `client-${customer.id}`;
                customer.id = ko.observable(customer.id);
                return customer;
            });
            this.customersData(customerSrc);
        }
        return this.customersData;
    };
    CustomersListViewModel.prototype._initCustomersSuggestions = async function () {
        let dataFromService;
        try {
            dataFromService = await CustomersServices.fetchCustomers();
        } catch (error) {
            //  console.log(error);
        }

        if (dataFromService) {
            const customerSrc = dataFromService.map((customer) => {
                //customer.id = `client-${customer.id}`;
                customer.id = ko.observable(customer.id);
                return customer;
            });
            this.searchedCustomersData(customerSrc);
            this.pagesNumber(this.searchedCustomersData().length/10);

        }
    };

    CustomersListViewModel.prototype._handleCloseDialog = function () {
        document.getElementById(this.deleteCustomerDialogId).close();

    };

    return CustomersListViewModel;
});