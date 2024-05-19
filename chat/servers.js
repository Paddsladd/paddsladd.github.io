function openServer(name, id, img) {
  main.innerHTML = "";

  const menu = document.createElement('div');
  menu.classList.add('server-info');
  menu.innerHTML = `<img src="${img}" alt="${name}">
    <h1>${name}</h1>
    <input type="text" name="Message" placeholder="Message everyone in ${name}" id="textbox">`;
  main.appendChild(menu);

  const textbox = document.getElementById('textbox');
  textbox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey){
      sendMessage(id);
    }
  });
  
  // console.log(menu);
  return menu;
}

function toggleServer(name, id, img) {
  const server = {
    name,
    img,
    id,
  };

  let storedServers = JSON.parse(localStorage.getItem('servers')) || [];

  const serverIndex = storedServers.findIndex(
    (item) => item.name === server.name
  );

  if (serverIndex !== -1) {
    // Server is joined, leave server
    storedServers.splice(serverIndex, 1);
    localStorage.setItem("servers", JSON.stringify(storedServers));
    displayServers();
  } else {
    // Server is not joined, join server
    storedServers.push(server);
    localStorage.setItem("servers", JSON.stringify(storedServers));
    displayServers();
  }

  // Display a success message
  successMessage.textContent = serverIndex !== -1
    ? "Server left!"
    : "Server joined!";
  successMessage.style.display = "flex";

  // Hide the success message after a three seconds
  setTimeout(function () {
    successMessage.style.display = "none";
  }, 3000);

  // console.log(server);
  return server;
}

function displayServers() {
  const serversData = JSON.parse(localStorage.getItem('servers')) || [];

  if (serversData.length === 0) {
    container.innerHTML = "";

    const homeBtn = document.createElement('div');
    homeBtn.classList.add('server');
    homeBtn.innerHTML = '<i class="fa-solid fa-house" onclick="displayHome()"></i>'
    container.appendChild(homeBtn);
  } else {
    container.innerHTML = "";

    const homeBtn = document.createElement('div');
    homeBtn.classList.add('server');
    homeBtn.innerHTML = '<i class="fa-solid fa-house" onclick="displayHome()"></i>'
    container.appendChild(homeBtn);

    serversData.forEach((item) => {
      const server = document.createElement('div');
      server.classList.add('server');
      server.innerHTML = `<img src="${item.img}" alt="${item.name}" onclick="openServer('${item.name}', ${item.id}, '${item.img}')">`;
      container.appendChild(server);
    });
  }

  // console.log(container.children);
  return container.children;
}