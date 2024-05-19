function checkLogin() {
  const userData = JSON.parse(localStorage.getItem('user')) || [];

  if (userData.length === 0) {
    displayLogin();
  } else {
    login(userData.password, userData.username);
  }

  // console.log(container.children);
  return container.children;
}


function displayLogin(error) {
  if (error.length === 0) 

  body.style.display = 'flex';
  body.style.alignItems = 'center';
  body.style.justifyContent 'center';
  body.style.height = '100vh';
}

function login(username, password) {
  if (!success) displayLogin('Wrong username or password');
}