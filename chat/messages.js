function sendMessage(id) {
  const message = {
    content: textbox.value,
    serverId: id,
    username,
    password,
  };

  textbox.value = '';

  console.log(message);
  return message;
}

function displayMessages() {}