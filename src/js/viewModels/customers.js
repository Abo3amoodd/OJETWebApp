/**
 * @license
 * Copyright (c) 2014, 2022, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your customer ViewModel code goes here
 */
define([
  'ojs/ojtranslation',
  'knockout',
  'utils/Core',
  'services/CustomersServices',
  'ojs/ojasyncvalidator-length',
  'ojs/ojarraydataprovider',
  'ojs/ojformlayout',
  'ojs/ojinputnumber',
  'ojs/ojinputtext',
  'ojs/ojselectsingle',
  'ojs/ojdatetimepicker',
  'ojs/ojbutton',
  'ojs/ojvalidationgroup',
  'ojs/ojmessages',
], function (Translations, ko, CoreUtils, CustomersServices, AsyncLengthValidator, ArrayDataProvider) {
  function CustomerViewModel(receivedParams) {


    const {
      params
    } = receivedParams;

    this._initAllIds();
    this._initVariables();
    this._initAllObservables();
    this._initAllLabels();
    this._initValidators();
    this.onInputFirstNameRawValueChange = this._onInputFirstNameRawValueChange.bind(this);
    this.onInputFirstNameValueChange = this._onInputFirstNameValueChange.bind(this);
    this.onInputWeightRawValueChange = this._onInputWeightRawValueChange.bind(this);
    this.onInputBirthdayValueChange = this._onInputBirthdayValueChange.bind(this);
    this.onInputCountryValueChange = this._onInputCountryValueChange.bind(this);

    this.onCreateButtonClick = this._onCreateButtonClick.bind(this);
    this.onResetButtonClick = this._onResetButtonClick.bind(this);
    if (params.id == 'Edit') {
      this.inputFirstNameValue(params.firstName);
      this.inputLastNameValue(params.lastName);
      this.inputCountryValue(params.country);
      this.inputStateValue(params.state);
      this.inputBirthdayValue(params.birthday);
      this.inputImageUrlValue(params.avatar);
      this.inputEmailValue(params.email);
    }
  }

  /**
   * @function _initAllIds
   * @description Initializes all ids
   */
  CustomerViewModel.prototype._initAllIds = function () {
    this.inputFirstNameId = CoreUtils.generateUniqueId();
    this.inputLastNameId = CoreUtils.generateUniqueId();
    this.inputFullNameId = CoreUtils.generateUniqueId();
    this.inputImageUrlId = CoreUtils.generateUniqueId();
    this.inputAgeId = CoreUtils.generateUniqueId();
    this.inputWeightId = CoreUtils.generateUniqueId();
    this.inputBirthdayId = CoreUtils.generateUniqueId();
    this.inputEmailId=CoreUtils.generateUniqueId();
    this.inputCountryId = CoreUtils.generateUniqueId();
    this.inputStateId = CoreUtils.generateUniqueId();
    this.formValidationGroupId = CoreUtils.generateUniqueId();
  };

  /**
   * @function _initVariables
   * @description Initializes all the variables values.
   */

  CustomerViewModel.prototype._initVariables = function () {
    const minAgeValue = this._getBirthday(18);
    this.inputBirthdayMaxValue = minAgeValue;

    this.birthdayMessage = {
      detail: Translations.getTranslatedString('messagesCustom.birthday'),
      summary: '',
      severity: 'error',
    };

    this.messagesPosition = CoreUtils.toastMessagePosition();
  };

  /**
   * @function _initAllObservables
   * @description Initializes all the observable values.
   */

  CustomerViewModel.prototype._initAllObservables = function () {
    this.inputFirstNameValue = ko.observable(null);
    this.inputLastNameValue = ko.observable(null);
    this.inputAgeValue = ko.observable(null);
    this.inputFullNameValue = ko.observable(null);
    this.inputWeightValue = ko.observable(null);
    this.inputCountryValue = ko.observable(null);
    this.inputStateValue = ko.observable(null);
    this.inputBirthdayValue = ko.observable(null);
    this.inputImageUrlValue = ko.observable(null);
    this.inputEmailValue=ko.observable(null);
    //message custom
    this.inputWeightMessageCustom = ko.observableArray([]);

    this.inputBirthdayMessageCustom = ko.observableArray([this.birthdayMessage]);

    this.inputLastNameValue.subscribe(
      function (_) {
        this.inputFullNameValue(`${this.inputFirstNameValue()} ${this.inputLastNameValue()}`);
      }.bind(this)
    );

    //disabled
    this.isInputStateDisabled = ko.observable(true);
    this.isInputLastNameDisabled = ko.computed(function () {
      if (this.inputFirstNameValue()) {
        return false;
      } else {
        return true;
      }
    }, this);

    //data providers
    this.inputCountryDataProvider = ko.observable(
      new ArrayDataProvider(
        [{
            value: 'EGY',
            label: 'Egypt',
          },
          {
            value: 'GER',
            label: 'Germany',
          },
        ], {
          keyAttributes: 'value',
        }
      )
    );

    this.inputStateDataProvider = ko.observable(
      new ArrayDataProvider([], {
        keyAttributes: 'value',
      })
    );

    this.messageDataProvider = ko.observable(new ArrayDataProvider([]));
  };

  /**
   * @function _initAllLabels
   * @description Initializes all Labels
   */
  CustomerViewModel.prototype._initAllLabels = function () {
    this.inputFirstNameLabel = Translations.getTranslatedString('inputs.firstName');
    this.inputLastNameLabel = Translations.getTranslatedString('inputs.lastName');
    this.inputFullNameLabel = Translations.getTranslatedString('inputs.fullName');
    this.inputAgeLabel = Translations.getTranslatedString('inputs.age');
    this.inputWeightLabel = Translations.getTranslatedString('inputs.weight');
    this.inputEmailLabel = Translations.getTranslatedString('inputs.email');
    this.inputBirthdayLabel = Translations.getTranslatedString('inputs.birthday');
    this.inputCountryLabel = Translations.getTranslatedString('inputs.country');
    this.inputStateLabel = Translations.getTranslatedString('inputs.state');
    this.inputImageUrlLabel = Translations.getTranslatedString('inputs.imageUrl');
    //buttons
    this.createButtonLabel = Translations.getTranslatedString('buttons.create');
    this.resetButtonLabel = Translations.getTranslatedString('buttons.reset');
  };

  /**
   * @function _initValidators
   * @description Initializes all validators
   */
  CustomerViewModel.prototype._initValidators = function () {
    this.inputFirstNameValidator = ko.observableArray([
      new AsyncLengthValidator({
        min: 2,
        max: 20,
        hint: {
          inRange: Translations.getTranslatedString('validators.firstNameLengthHint', '{min}', '{max}'),
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

  /**
   * @function _onInputFirstNameRawValueChange
   * @description Initializes an event listener
   */
  CustomerViewModel.prototype._onInputFirstNameRawValueChange = function (event) {
    if (event.detail.value) {
      event.currentTarget.validate();
    }
  };

  /**
   * @function _onInputFirstNameValueChange
   * @description Initializes all event listeners
   */
  CustomerViewModel.prototype._onInputFirstNameValueChange = function () {
    this.onInputFirstNameValueChange = function (event) {
      const value = event.detail.value;
      if (value) {
        this.isInputLastNameDisabled(false);
        return;
      } else {
        this.isInputLastNameDisabled(true);
      }
    };
  };

  /**
   * @function _onInputWeightRawValueChange
   * @description Initializes all event listeners
   */
  CustomerViewModel.prototype._onInputWeightRawValueChange = function (event) {
    const value = event.detail.value;
    if (Number(value) < 30) {
      this.inputWeightMessageCustom([{
        detail: Translations.getTranslatedString('messagesCustom.weight'),
        summary: '',
        severity: 'warning',
      }, ]);
    }
  };

  /**
   * @function _onInputBirthdayValueChange
   * @description Initializes an event listener
   */
  CustomerViewModel.prototype._onInputBirthdayValueChange = function (event) {
    const value = event.detail.value;

    if (value) {
      this.inputAgeValue(this._getAge(value));
      this.inputBirthdayMessageCustom([]);
    } else {
      this.inputAgeValue(null);
      this.inputBirthdayMessageCustom([this.birthdayMessage]);
    }
  };

  /**
   * @function _onInputCountryValueChange
   * @description Initializes all event listeners
   */
  CustomerViewModel.prototype._onInputCountryValueChange = function (event) {
    const value = event.detail.value;
    if (value) {
      this.inputStateValue(null);
      let statesArray;
      if (value === 'EGY') {
        statesArray = [{
            value: 'ALX',
            label: 'Alexandria',
          },
          {
            value: 'CAI',
            label: 'Cairo',
          },
          {
            value: 'LUX',
            label: 'Luxor',
          },
        ];
      } else if (value === 'GER') {
        statesArray = [{
            value: 'MUN',
            label: 'Munich',
          },
          {
            value: 'ULM',
            label: 'Ulm',
          },
          {
            value: 'BRL',
            label: 'Berlin',
          },
        ];
      }
      this.isInputStateDisabled(false);
      this.inputStateDataProvider(
        new ArrayDataProvider(statesArray, {
          keyAttributes: 'value',
        })
      );
    } else {
      this.isInputStateDisabled(true);
      this.inputStateDataProvider(
        new ArrayDataProvider([], {
          keyAttributes: 'value',
        })
      );
    }
  };

  /**
   * @function _onCreateButtonClick
   * @description Initializes all event listeners
   */
  CustomerViewModel.prototype._onCreateButtonClick = async function () {
    const valid = CoreUtils.checkValidationGroup(this.formValidationGroupId);
    if (valid) {
      const jsonServiceRequest = {

        firstName: this.inputFirstNameValue(),
        lastName: this.inputLastNameValue(),
        birthday: this.inputBirthdayValue(),
        country: this.inputCountryValue(),
        state: this.inputStateValue(),
        avatar: this.inputImageUrlValue(),
        email:this.inputEmailValue()


      };
      let dataFromService;
      try {
        dataFromService = await CustomersServices.saveCustomer(jsonServiceRequest);
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

      if (dataFromService && dataFromService.id) {
        this.messageDataProvider(
          new ArrayDataProvider([{
            severity: 'confirmation',
            detail: 'Saved Successfully',
            timestamp: new Date().toISOString(),
            autoTimeout: CoreUtils.getAutoTimeout(),
          }, ])
        );
        this._onResetButtonClick();
      }
    }
  };

  /**
   * @function _onResetButtonClick
   * @description Initializes all event listeners
   */
  CustomerViewModel.prototype._onResetButtonClick = function () {
    this.inputLastNameValue(null);
    this.inputFirstNameValue(null);
    this.inputAgeValue(null);
    this.inputFullNameValue(null);
    this.inputWeightValue(0);
    this.inputCountryValue(null);
    this.inputStateValue(null);
    this.inputBirthdayValue(null);
    this.inputImageUrlValue(null);
  };

  /**
   * @function _getAge
   * @description Calculates the age based on ISOStrings
   * @param {ISOString} dateString ISOString from input date type
   * @returns {Number}
   */
  CustomerViewModel.prototype._getAge = function (dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m == 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 0 || age > 120) {
      return null;
    }
    return age;
  };

  /**
   * @function _getBirthday
   * @description Calculates birthday based on age
   * @param {Number} age age number
   * @returns {Number}
   */
  CustomerViewModel.prototype._getBirthday = function (age) {
    const today = new Date();
    const year = today.getFullYear() - age;
    const birthday = new Date(year, today.getMonth(), today.getDate()).toISOString();
    return birthday.split('T')[0];
  };

  /*
   * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
   * return a constructor for the ViewModel so that the ViewModel is constructed
   * each time the view is displayed.
   */

  return CustomerViewModel;
});