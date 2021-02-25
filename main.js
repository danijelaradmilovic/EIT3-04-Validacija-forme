const form = document.querySelector('#sign-in');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const username = document.querySelector('#username');
const submit = document.querySelector('#submit');

// Regular expression objekti za proveru email-a i password-a

const patternEmail =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const patternPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;


// isRequire funkcija služi za proveru unosa podatka u obavezno polje 

function isRequire(data) {
    // if (data === '') 
    //     return false;
    // else 
    //     return true;

    return (data === '') ? false : true;
}

// isValidEmail funkcija služi za proveru pravilnog unosa email-a u skladu sa pattern-om 

function isValidEmail(data) {
    // test metoda je definisana u okviru RegExp objekta
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test

    return patternEmail.test(data); 
}

// isValidPassword funkcija služi za proveru pravilnog unosa password-a u skladu sa pattern-om 

function isValidPassword(data) {
    return patternPassword.test(data);
}

// showError i show Success funkcije služe za promenu css klase odgovarajućeg form-item-a kao i ispis poruke u njegovom small tag-u

function showError(input, message) {
    const formItem = input.parentElement;

    formItem.classList.add('error');
    formItem.classList.remove('success');

    formItem.querySelector('small').textContent = message;
}

function showSuccess(input) {
    const formItem = input.parentElement;

    formItem.classList.remove('error');
    formItem.classList.add('success');

    if (input != submit) {
        formItem.querySelector('small').textContent = '';
    } else {
        formItem.querySelector('small').textContent = 'Uspešno ste se prijavili na sistem';
    }
}

// funkcija checkEmail proverava pravilan unos po svim kriterijumima za email

function checkEmail() {
    valid = false;
    const emailData = email.value.trim();

    if (!isRequire(emailData)) {
        // ispisi poruku korisniku - error
        showError(email, 'Ovo polje je obavezno.');
    } else if (!isValidEmail(emailData)) {
        // ispisi drugu poruku - error
       
        showError(email, 'Unesite validnu email adresu.')
        
    } else {
        // oznaka - uspesno uneta vrednost       
        showSuccess(email);
        valid = true;
    }
    return valid;
}

// funkcija checkPassword proverava pravilan unos po svim kriterijumima za password


function checkPassword() {
    valid = false;
    const passwordData = password.value.trim();

    if (!isRequire(passwordData)) {
        // ispisi poruku korisniku - error
        showError(password, 'Ovo polje je obavezno.');
    } else if (!isValidPassword(passwordData)) {
        // ispisi drugu poruku - error
       
        showError(password, 'Lozinka mora da sadrzi minimum 8 karakter, ne sme da sadrzi razmake, mora da sadrzi minimum jedan broj, specijalni karakter i veliko slovo!');
        
    } else {
        // oznaka - uspesno uneta vrednost       
        showSuccess(password);
        valid = true;
    }
    return valid;
}

// funkcija checkPasswordConfirm proverava pravilan unos po svim kriterijumima za potvrdu lozinke

function checkPasswordConfirm() {
    valid = false;
    const passwordData = password.value.trim();
    const passwordConfirmData = confirmPassword.value.trim();

    if (!isRequire(passwordConfirmData)) {
        // ispisi poruku korisniku - error
        showError(confirmPassword, 'Ovo polje je obavezno.');
    } else if (passwordData !== passwordConfirmData) {
        // ispisi drugu poruku - error       
        showError(confirmPassword, 'Lozinka u ovom polju nije dobro uneta. Potrebno je ponoviiti unos.');        
    } else {
        // oznaka - uspesno uneta vrednost       
        showSuccess(confirmPassword);
        valid = true;
    }
    return valid;
}

// funkcija checkUsername proverava da li polje za unos username-a uneto

function checkUsername() {
    valid = false;
    const usernameData = username.value.trim();

    if (!isRequire(usernameData)) {
        // ispisi poruku korisniku - error
        showError(username, 'Ovo polje je obavezno.');
            
    } else {
        // oznaka - uspesno uneta vrednost       
        showSuccess(username);
        valid = true;
    }
    return valid;
}


form.addEventListener('submit', function(event) {
    // preventDefault metoda sprečava da se desi default ponašanje nad event-om
    // u ovom slučaju se sprečava slanje podataka forme na server stranu, pri čemu se prvo vrši njihova validacija na klijent strani.
    event.preventDefault();
    
    let emailValid = checkEmail();
    let passwordValid = checkPassword();
    let passwordConfirmValid = checkPasswordConfirm();
    let usernameValid = checkUsername();

    let formValid = emailValid && passwordValid && passwordConfirmValid && usernameValid;
   
    if (formValid) {
        showSuccess(submit);
    }
   
})