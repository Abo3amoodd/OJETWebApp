/**
 * @license
 * Copyright (c) 2014, 2022, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your loginPage ViewModel code goes here
 */
define(['../accUtils','utils/Service', "knockout", "ojs/ojbootstrap",'ojs/ojtranslation','ojs/ojasyncvalidator-length','utils/Core',
'services/CustomersServices','ojs/ojarraydataprovider',"ojs/ojknockout", "ojs/ojinputtext", "ojs/ojlabel", "ojs/ojformlayout",'ojs/ojbutton','ojs/ojmessages',
],function(accUtils,ServiceUtils, ko, ojbootstrap_1,Translations,AsyncLengthValidator,CoreUtils,CustomersServices,ArrayDataProvider) {

    function loginPageViewModel(params) {
        this._initObservables();
        this._initLabels();
        this._initVariables();
        this._initValidators();

      //  this.handleLogin=this._handleLogin.bind(this);

            this.onLoginButton= async(e) =>{
            //this.loading(true);
            this._handleLogin();
            //this._handleLogin();
            }
    
        }

    loginPageViewModel.prototype._initObservables = function(){
        this.inputUserNameValue=ko.observable(null);
        this.inputUserPasswordValue=ko.observable(null);
        this.customersData = ko.observableArray([]);
        this.messageDataProvider = ko.observable(new ArrayDataProvider([]));
    };
    loginPageViewModel.prototype._initVariables = function () {
        this.customersDataProvider = new ArrayDataProvider(this.customersData, {
            keyAttributes: "userName"
        });
        this.messagesPosition = CoreUtils.toastMessagePosition();
    };

    loginPageViewModel.prototype._initLabels=function () {
        this.inputUserNameLabel=Translations.getTranslatedString('inputs.userName');
        this.inputUserPasswordLabel=Translations.getTranslatedString('inputs.userPassword');
        this.loginButtonLabel = Translations.getTranslatedString('buttons.login');


    };

    loginPageViewModel.prototype._initValidators=function(){
        this.inputUserPasswordValidator = ko.observableArray([
            new AsyncLengthValidator({
            min: 6,
            max: 15,
            hint: {
                inRange: Translations.getTranslatedString('validators.userPasswordLengthHint', '{min}', '{max}'),
            },
            messageSummary: {
                tooLong: Translations.getTranslatedString('validators.tooManyChars'),
                tooShort: Translations.getTranslatedString('validators.tooFewChars'),
            },
            messageDetail: {
                tooLong: Translations.getTranslatedString('validators.tooLong', '{max}'),
                tooShort: Translations.getTranslatedString('validators.tooShort', '{min}'),
            },
            }),
        ]);
    };

loginPageViewModel.prototype._handleLogin = async function (context) {
            let dataFromService;
            try {
            dataFromService = await CustomersServices.validateCustomer(this.inputUserNameValue(),this.inputUserPasswordValue());
            //  console.log(dataFromService);
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
            if (dataFromService.length!=0) {
                const customerSrc = dataFromService.map((customer) => {
                
                    customer.userName = ko.observable(customer.userName);
                    return customer;
                });
                this.customersData(customerSrc);
                localStorage.setItem("userName", customerSrc[0].label);
                this.userLogin(customerSrc[0].label);
               // this.isLogged(!this.isLogged());
                this.messageDataProvider(
                new ArrayDataProvider([{
                    severity: 'success',
                    detail: 'logged In',
                    timestamp: new Date().toISOString(),
                    autoTimeout: CoreUtils.getAutoTimeout(),
                    }, ])
                );
                
            }
            else{
                $('#passwordsNoMatchRegister').show();
                this.messageDataProvider(
                    new ArrayDataProvider([{
                        severity: 'error',
                        detail: 'wrong Username or Password',
                        timestamp: new Date().toISOString(),
                        autoTimeout: CoreUtils.getAutoTimeout(),
                        }, ])
                    );
            }       
    }
        

    return loginPageViewModel;
    });
