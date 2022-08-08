define({
// root bundle
root: {
inputs: {
    firstName: 'First Name',
    lastName: 'Last Name',
    fullName: 'Full Name',
    age: 'Age',
    weight: 'Weight',
    birthday: 'Birth Date',
    country: 'Country',
    state: 'State',
    list:'My List',
    imageUrl:'Image Url',
    email:'Email Address',
},
headers:{
    favoritesDialogTitle:'Add To List',
},
validators: {
    firstNameLengthHint: 'Value must have at least {0} characters but not more than {1}',
    tooManyChars: 'Too Many Characters',
    tooFewChars: 'Too Few Characters',
    tooLong: 'Number of characters is too high. Enter at most {0} characters.',
    tooShort: 'Number of characters is too low. Enter at least {0} characters.',
},
messagesCustom: {
    weight: 'You should have a higher value',
    birthday: 'You must be at least 18 years old',
},
buttons: {
    create: 'Create',
    reset: 'Reset',
    addToCart:'Add To Cart',
    addToList:'Add To List',
    saveToList:'Save',
    closeDialog:'Close',
},
// ... contents omitted
},

// supported locales    .

ar: 1,
de: 1,
});
