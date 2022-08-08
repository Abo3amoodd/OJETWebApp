    define({
    inputs:{
        firstName:"Vorname",
        lastName:"Nachname",
        fullName:"Vollständiger Name",
        age:"Alter",
        weight:"Gewicht"
    },
    validators:{
        firstNameLengthHint:'Value must have at least {0} characters but not more than {1}',
        tooManyChars:'Too Many Characters',
        tooFewChars:'Too Few Characters',
        tooLong:'Number of characters is too high. Enter at most {0} characters.',
        tooShort:'Number of characters is too low. Enter at least {0} characters.'
    }
    // root bundle
    });