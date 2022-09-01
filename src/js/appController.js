/**
 * @license
 * Copyright (c) 2014, 2022, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your application specific code will go here
 */
define(['knockout', 'ojs/ojcontext', 'ojs/ojmodule-element-utils', 'ojs/ojknockouttemplateutils', 'ojs/ojcorerouter', 'ojs/ojmodulerouter-adapter', 'ojs/ojknockoutrouteradapter', 'ojs/ojurlparamadapter', 'ojs/ojresponsiveutils', 'ojs/ojresponsiveknockoututils', 'ojs/ojarraydataprovider','ojs/ojtranslation','utils/Core',
'services/CustomersServices','ojs/ojasyncvalidator-length',
    'ojs/ojdrawerpopup',"ojs/ojprogress-circle", 'ojs/ojmodule-element', 'ojs/ojknockout',"ojs/ojinputtext", "ojs/ojlabel", "ojs/ojformlayout",'ojs/ojbutton','ojs/ojmessages',
  ],
  function (ko, Context, moduleUtils, KnockoutTemplateUtils, CoreRouter, ModuleRouterAdapter, KnockoutRouterAdapter, UrlParamAdapter, ResponsiveUtils, ResponsiveKnockoutUtils, ArrayDataProvider,Translations,CoreUtils,CustomersServices,AsyncLengthValidator) {

    function ControllerViewModel(params) {

      this.KnockoutTemplateUtils = KnockoutTemplateUtils;

      // Handle announcements sent when pages change, for Accessibility.
      this.manner = ko.observable('polite');
      this.message = ko.observable();
      announcementHandler = (event) => {
        this.message(event.detail.message);
        this.manner(event.detail.manner);
      };

      document.getElementById('globalBody').addEventListener('announce', announcementHandler, false);


      // Media queries for repsonsive layouts
      const smQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      this.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
      const mdQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
      this.mdScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

      let navData = [{
          path: '',
          redirect: 'dashboard'
        },
        {
          path: 'customers',
          detail: {
            label: 'Customers Form',
            iconClass: 'oj-ux-ico-contact-group'
          }
        },
        {
          path: 'dashboard',
          detail: {
            label: 'Dashboard',
            iconClass: 'oj-ux-ico-bar-chart'
          }
        },
        {
          path: 'incidents',
          detail: {
            label: 'Incidents',
            iconClass: 'oj-ux-ico-fire'
          }
        },
        {
          path: 'books',
          detail: {
            label: 'Books',
            iconClass: 'oj-ux-ico-book'
          }
        },
        {
          path: 'customersList',
          detail: {
            label: 'Customers',
            iconClass: 'oj-ux-ico-contact-group'
          }
        },
        {
          path: 'about',
          detail: {
            label: 'About',
            iconClass: 'oj-ux-ico-information-s'
          }
        },


      ];

      let navData2 = [{
        path: '',
        redirect: 'dashboard'
      },
      {
        path: 'dashboard',
        detail: {
          label: 'dashboard',
        }
      },


    ];


      // Setup the navDataProvider with the routes, excluding the first redirected
      // route.

      if(localStorage.getItem("userName")!=null){
      // Router setup
      let router = new CoreRouter(navData, {
        urlAdapter: new UrlParamAdapter()
      });
      router.sync();

      this.moduleAdapter = new ModuleRouterAdapter(router);

      this.selection = new KnockoutRouterAdapter(router);
        this.navDataProvider = new ArrayDataProvider(navData.slice(2), {
          keyAttributes: "path"
        });
      }
      else{
      // Router setup
      let router = new CoreRouter(navData2, {
        urlAdapter: new UrlParamAdapter()
      });
      router.sync();
      this.moduleAdapter = new ModuleRouterAdapter(router);
      this.selection = new KnockoutRouterAdapter(router);
      this.navDataProvider = new ArrayDataProvider(navData2.slice(1), {
        keyAttributes: "path"
      });
      }



      // Drawer
      self.sideDrawerOn = ko.observable(false);

      // Close drawer on medium and larger screens
      this.mdScreen.subscribe(() => {
        self.sideDrawerOn(false)
      });

      // Called by navigation drawer toggle button and after selection of nav drawer item
      this.toggleDrawer = () => {
        self.sideDrawerOn(!self.sideDrawerOn());
      }

      // Header
      // Application Name used in Branding Area
      this.appName = ko.observable("My First App");
      // User Info used in Global Navigation area
      this.userLogin =ko.observable(localStorage.getItem("userName"));
      this.isLogged =ko.observable(localStorage.getItem("userName")!=null);

     // this.isLogged = ko.observable(!!localStorage.getItem("userName"));      
     // localStorage.clear();
      // Footer
      this.footerLinks = [{
          name: 'About Oracle',
          linkId: 'aboutOracle',
          linkTarget: 'http://www.oracle.com/us/corporate/index.html#menu-about'
        },
        {
          name: "Contact Us",
          id: "contactUs",
          linkTarget: "http://www.oracle.com/us/corporate/contact/index.html"
        },
        {
          name: "Legal Notices",
          id: "legalNotices",
          linkTarget: "http://www.oracle.com/us/legal/index.html"
        },
        {
          name: "Terms Of Use",
          id: "termsOfUse",
          linkTarget: "http://www.oracle.com/us/legal/terms/index.html"
        },
        {
          name: "Your Privacy Rights",
          id: "yourPrivacyRights",
          linkTarget: "http://www.oracle.com/us/legal/privacy/index.html"
        },
      ];



    this._initObservables();
    this._initLabels();
    this._initVariables();
    this._initValidators();

    //hide
    $('#passwordsNoMatchRegister').hide();

    this.onSignoutButton = (e) => {
      localStorage.clear();
      window.location.reload();
    };

    this.onLoginButton= async(e) =>{
      const button = e.target;
      button.disabled = true;
      this.loading(true);
      this._handleLogin(); 
      }

    }


    ControllerViewModel.prototype._initObservables = function(){
      this.inputUserNameValue=ko.observable(null);
      this.inputUserPasswordValue=ko.observable(null);
      this.customersData = ko.observableArray([]);
      this.messageDataProvider = ko.observable(new ArrayDataProvider([]));
      this.loading=ko.observable(false);
  };
  ControllerViewModel.prototype._initVariables = function () {
      this.customersDataProvider = new ArrayDataProvider(this.customersData, {
          keyAttributes: "userName"
      });
      this.messagesPosition = CoreUtils.toastMessagePosition();
  };

  ControllerViewModel.prototype._initLabels=function () {
      this.inputUserNameLabel=Translations.getTranslatedString('inputs.userName');
      this.inputUserPasswordLabel=Translations.getTranslatedString('inputs.userPassword');
      this.loginButtonLabel = Translations.getTranslatedString('buttons.login');


  };

  ControllerViewModel.prototype._initValidators=function(){
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

  ControllerViewModel.prototype._handleLogin = async function (context) {
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
    if (dataFromService.length>0) {
        const customerSrc = dataFromService.map((customer) => {
            customer.userName = ko.observable(customer.userName);
            return customer;
        });
        this.customersData(customerSrc);
        this.userLogin(customerSrc[0].label);
        this.messageDataProvider(
          new ArrayDataProvider([{
              severity: 'success',
              detail: 'Login Successful!',
              timestamp: new Date().toISOString(),
              autoTimeout: CoreUtils.getAutoTimeout(),
              }, ])
          );
        localStorage.setItem("userName", customerSrc[0].label);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
    }
    else{
        //$('#passwordsNoMatchRegister').show();
        this.messageDataProvider(
            new ArrayDataProvider([{
                severity: 'error',
                detail: 'Wrong Username or Password',
                timestamp: new Date().toISOString(),
                autoTimeout: CoreUtils.getAutoTimeout(),
                }, ])
            );
            setTimeout(() => {
              window.location.reload();
            }, 1000);
    }       
    
  };



    // release the application bootstrap busy state
  Context.getPageContext().getBusyContext().applicationBootstrapComplete();

    return new ControllerViewModel();
  }
);