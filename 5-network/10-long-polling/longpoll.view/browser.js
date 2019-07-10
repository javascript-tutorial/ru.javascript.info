// Отправка сообщений, простой POST
function PublishForm(form, url) {

  function sendMessage(message) {
    fetch(url, {
      method: 'POST',
      body: message
    });
  }

  form.onsubmit = function() {
    let message = form.message.value;
    if (message) {
      form.message.value = '';
      sendMessage(message);
    }
    return false;
  };
}

// Получение сообщений путём длинного опроса
function SubscribePane(elem, url) {

  function showMessage(message) {
    let messageElem = document.createElement('div');
    messageElem.append(message);
    elem.append(messageElem);
  }

  async function subscribe() {
    let response = await fetch(url);

    if (response.status == 502) {
      // Таймаут подключения
      // случается, когда соединение ждало слишком долго.
      // давайте восстановим связь
      await subscribe();
    } else if (response.status != 200) {
      // Показать ошибку
      showMessage(response.statusText);
      // Подключиться снова через секунду.
      await new Promise(resolve => setTimeout(resolve, 1000));
      await subscribe();
    } else {
      // Получить сообщение
      let message = await response.text();
      showMessage(message);
      await subscribe();
    }
  }

  subscribe();

}
