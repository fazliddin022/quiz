
const loginForm = document.getElementById('loginForm')

loginForm.addEventListener('submit', (el) => {
    el.preventDefault();
    let email = loginForm.emailInput.value
    let password = loginForm.password.value

    if(email === "fazliddin@gmail.com" && password === "fazliddin"){
        console.log("To'g'ri");
        
        location.href = '../pages/admin.html'
    }
    else{
        console.log('Xato');
        
    }

    console.log(email);
})