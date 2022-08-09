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
    'utils/Core',
    'services/CustomersServices',
    'ojs/ojavatar',
    'ojs/ojgauge',
    'ojs/ojdialog',
    'ojs/ojselectsingle'
    ], 
    function(Translations,
            ko,
            ArrayDataProvider,
            CoreUtils, 
            CustomersServices)
    {

        const _t=Translations.getTranslatedString;
        function DeleteCustomerDialogViewModel(context) {

            this._initIds(context);

            this._initLabels();

            this._initObservables(context);

            this._initVariables(context);

            this.handleDeleteCustomer=this._handleDeleteCustomer.bind(this);

            this.handleCloseDialog=this._handleCloseDialog.bind(this);

            this.beforeDeleteCustomerDialogClose=this._beforeDeleteCustomerDialogClose.bind(this);

        }
        DeleteCustomerDialogViewModel.prototype._initIds=function(context) {
            
            this.deleteCustomerDialogId=context.deleteCustomerDialogId;

        };

        DeleteCustomerDialogViewModel.prototype._initLabels=function() {

            this.deleteCustomerDialogTitle=_t('headers.deleteCustomerDialogTitle');

            this.deleteCustomerLabel=_t('buttons.deleteCustomer');

            this.closeDialogLabel=_t('buttons.closeDialog');


        };

        DeleteCustomerDialogViewModel.prototype._initObservables=function(context) {

            this.messageDataProvider = ko.observable(new ArrayDataProvider([]));
          //  this.inputListValue=ko.observable(null);
          //  this.listData=context.listData;
        };

        DeleteCustomerDialogViewModel.prototype._initVariables=function(context) {
           // this.inputListDataProvider= new ArrayDataProvider(this.listData,{
           //     keyAttributes:'value',
           // });
           // this.changeColorCallback=context.changeColorCallback;

        };

        DeleteCustomerDialogViewModel.prototype._handleDeleteCustomer= async function(context) {
            let dataFromService;
            try {
            dataFromService = await CustomersServices.deleteCustomer();
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
            document.getElementById(this.deleteCustomerDialogId).close();

        };

        DeleteCustomerDialogViewModel.prototype._handleCloseDialog=function() {
            document.getElementById(this.deleteCustomerDialogId).close();

        };

        DeleteCustomerDialogViewModel.prototype._beforeDeleteCustomerDialogClose=function() {
          //  this.inputListValue(null);
            };


        return DeleteCustomerDialogViewModel;

    }
);
