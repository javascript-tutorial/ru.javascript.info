<<<<<<< HEAD
 parent.onmouseover = parent.onmouseout = parent.onmousemove = handler;
=======
parent.onmouseover = parent.onmouseout = parent.onmousemove = handler;
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

function handler(event) {
  let type = event.type;
  while (type < 11) type += ' ';

  log(type + " target=" + event.target.id)
  return false;
}


function clearText() {
  text.value = "";
  lastMessage = "";
}

let lastMessageTime = 0;
let lastMessage = "";
let repeatCounter = 1;

function log(message) {
  if (lastMessageTime == 0) lastMessageTime = new Date();

  let time = new Date();

  if (time - lastMessageTime > 500) {
    message = '------------------------------\n' + message;
  }

  if (message === lastMessage) {
    repeatCounter++;
    if (repeatCounter == 2) {
      text.value = text.value.trim() + ' x 2\n';
    } else {
      text.value = text.value.slice(0, text.value.lastIndexOf('x') + 1) + repeatCounter + "\n";
    }

  } else {
    repeatCounter = 1;
    text.value += message + "\n";
  }

  text.scrollTop = text.scrollHeight;

<<<<<<< HEAD
   lastMessageTime = time;
   lastMessage = message;
 }
=======
  lastMessageTime = time;
  lastMessage = message;
}
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72
