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
    function(Translations,
            ko,
            ArrayDataProvider) 
    {

        const _t=Translations.getTranslatedString;
        function FavoritesDialogViewModel(context) {
            this._initIds(context);

            this._initLabels();

            this._initObservables(context);

            this._initVariables(context);

            this.handleSaveToList=this._handleSaveToList.bind(this);

            this.handleCloseDialog=this._handleCloseDialog.bind(this);

            this.beforeFavoritesDialogClose=this._beforeFavoritesDialogClose.bind(this);

        }
        FavoritesDialogViewModel.prototype._initIds=function(context) {
            
            this.favoritesDialogId=context.favoritesDialogId;

        };

        FavoritesDialogViewModel.prototype._initLabels=function() {

            this.favoritesDialogTitle=_t('headers.favoritesDialogTitle');

            this.saveToListLabel=_t('buttons.saveToList');

            this.closeDialogLabel=_t('buttons.closeDialog');

            this.inputListLabel=_t('inputs.list');


        };

        FavoritesDialogViewModel.prototype._initObservables=function(context) {

            this.inputListValue=ko.observable(null);
            this.listData=context.listData;
        };

        FavoritesDialogViewModel.prototype._initVariables=function(context) {
            this.inputListDataProvider= new ArrayDataProvider(this.listData,{
                keyAttributes:'value',
            });
            this.changeColorCallback=context.changeColorCallback;

        };

        FavoritesDialogViewModel.prototype._handleSaveToList=function() {
            
            this.changeColorCallback();
            document.getElementById(this.favoritesDialogId).close();

        };

        FavoritesDialogViewModel.prototype._handleCloseDialog=function() {
            document.getElementById(this.favoritesDialogId).close();

        };

        FavoritesDialogViewModel.prototype._beforeFavoritesDialogClose=function() {
            this.inputListValue(null);
            };


        return FavoritesDialogViewModel;

    }
);
