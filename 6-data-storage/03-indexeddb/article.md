libs:
  - 'https://cdn.jsdelivr.net/npm/idb@3.0.2/build/idb.min.js'

---

# IndexedDB

<<<<<<< HEAD
IndexedDB - это встроенная база данных, более мощная, чем `localStorage`.

- Хранилище ключей/значений: доступны несколько типов ключей, а значения могут быть (почти) любыми.
- Поддерживает транзакции для надёжности.
- Поддерживает запросы в диапазоне ключей и индексы.
- Позволяет хранить больше данных, чем `localStorage`.
=======
IndexedDB is a database that is built into a browser, much more powerful than `localStorage`.

- Stores almost any kind of values by keys, multiple key types.
- Supports transactions for reliability.
- Supports key range queries, indexes.
- Can store much bigger volumes of data than `localStorage`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Для традиционных клиент-серверных приложений эта мощность обычно чрезмерна. IndexedDB предназначена для оффлайн приложений, можно совмещать с ServiceWorkers и другими технологиями.

Интерфейс для IndexedDB, описанный в спецификации <https://www.w3.org/TR/IndexedDB>, основан на событиях.

<<<<<<< HEAD
Мы также можем использовать `async/await` с помощью обёртки, которая основана на промисах, например <https://github.com/jakearchibald/idb>. Это очень удобно, но обёртка не идеальна, она не может полностью заменить события. Поэтому мы начнём с событий, а затем, когда разберёмся в IndexedDB, рассмотрим и обёртку.
=======
We can also use `async/await` with the help of a promise-based wrapper, like <https://github.com/jakearchibald/idb>. That's pretty convenient, but the wrapper is not perfect, it can't replace events for all cases. So we'll start with events, and then, after we gain an understanding of IndexedDb, we'll use the wrapper.

```smart header="Where's the data?"
Technically, the data is usually stored in the visitor's home directory, along with browser settings, extensions, etc.

Different browsers and OS-level users have each their own independant storage.
```
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Открыть базу данных

<<<<<<< HEAD
Для начала работы с IndexedDB нужно открыть базу данных.
=======
To start working with IndexedDB, we first need to `open` (connect to) a database.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Синтаксис:

```js
let openRequest = indexedDB.open(name, version);
```

- `name` -- название базы данных, строка.
- `version` -- версия базы данных, положительное целое число, по умолчанию `1` (объясняется ниже).

<<<<<<< HEAD
У нас может быть множество баз данных с различными именами, но все они существуют в контексте текущего источника (домен/протокол/порт). Разные сайты не могут получить доступ к базам данных друг друга.

После этого вызова необходимо назначить обработчик событий для объекта `openRequest`:
- `success`: база данных готова к работе, готов "объект базы данных" `openRequest.result`, его следует использовать для дальнейших вызовов.
- `error`: не удалось открыть базу данных.
- `upgradeneeded`: база открыта, но её схема устарела (см. ниже).
=======
We can have many databases with different names, but all of them exist within the current origin (domain/protocol/port). Different websites can't access each other's databases.

The call returns `openRequest` object, we should listen to events on it:
- `success`: database is ready, there's the "database object" in `openRequest.result`, we should use it for further calls.
- `error`: opening failed.
- `upgradeneeded`: database is ready, but its version is outdated (see below).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

**IndexedDB имеет встроенный механизм "версионирования схемы", который отсутствует в серверных базах данных.**

<<<<<<< HEAD
В отличие от серверных баз данных, IndexedDB работает на стороне клиента, в браузере, и у нас нет прямого доступа к данным. Но когда мы публикуем новую версию нашего приложения,  возможно, нам понадобится обновить базу данных.
=======
Unlike server-side databases, IndexedDB is client-side, the data is stored in the browser, so we, developers, don't have full-time access to it. So, when we have published a new version of our app, and the user visits our webpage, we may need to update the database.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Если локальная версия базы данных меньше, чем версия, определённая в `open`, то сработает специальное событие `upgradeneeded`, и мы сможем сравнить версии и обновить структуры данных по мере необходимости.

<<<<<<< HEAD
Это событие также сработает, если базы данных ещё не существует, так что в этом обработчике мы можем выполнить инициализацию.

Например, когда мы впервые публикуем наше приложение, мы открываем базу данных с версией `1` и выполняем инициализацию в обработчике `upgradeneeded`:
=======
The `upgradeneeded` event also triggers when the database doesn't yet exist (technically, its version is `0`), so we can perform the initialization.

Let's say we published the first version of our app.

Then we can open the database with version `1` and perform the initialization in an `upgradeneeded` handler like this:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
let openRequest = indexedDB.open("store", *!*1*/!*);

openRequest.onupgradeneeded = function() {
  // срабатывает, если на клиенте нет базы данных
  // ...выполнить инициализацию...
};

openRequest.onerror = function() {
  console.error("Error", openRequest.error);
};

openRequest.onsuccess = function() {
  let db = openRequest.result;
<<<<<<< HEAD
  // продолжить работу с базой данных, используя объект db
};
```

Когда мы публикуем вторую версию:
=======
  // continue working with database using db object
};
```

Then, later, we publish the 2nd version.

We can open it with version `2` and perform the upgrade like this:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
let openRequest = indexedDB.open("store", *!*2*/!*);

<<<<<<< HEAD
// проверить существование указанной версии базы данных, обновить по мере необходимости:
openRequest.onupgradeneeded = function() {
  // версия существующей базы данных меньше 2 (или база данных не существует)
  let db = openRequest.result;
  switch(db.version) { // существующая (старая) версия базы данных
=======
openRequest.onupgradeneeded = function(event) {
  // the existing database version is less than 2 (or it doesn't exist)
  let db = openRequest.result;
  switch(event.oldVersion) { // existing db version
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    case 0:
      // версия 0 означает, что на клиенте нет базы данных
      // выполнить инициализацию
    case 1:
      // на клиенте версия базы данных 1
      // обновить
  }
};
```

<<<<<<< HEAD
Таким образом, в `openRequest.onupgradeneeded` мы обновляем базу данных. Скоро подробно увидим, как это делается. А после того, как этот обработчик завершится без ошибок, сработает `openRequest.onsuccess`.

После `openRequest.onsuccess` у нас есть объект базы данных в `openRequest.result`, который мы будем использовать для дальнейших операций.
=======
Please note: as our current version is `2`, the `onupgradeneeded` handler has a code branch for version `0`, suitable for users that are accessing for the first time and have no database, and also for version `1`, for upgrades.

And then, only if `onupgradeneeded` handler finishes without errors, `openRequest.onsuccess` triggers, and the database is considered successfully opened.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Удалить базу данных:

```js
let deleteRequest = indexedDB.deleteDatabase(name)
// deleteRequest.onsuccess/onerror отслеживает результат
```

<<<<<<< HEAD
```warn header="А что, если открыть предыдущую версию?"
Что если мы попробуем открыть базу с более низкой версией, чем текущая? Например, на клиенте база версии 3, а мы вызываем `open(...2)`.

Возникнет ошибка, сработает `openRequest.onerror`.

Такое может произойти, если посетитель загрузил устаревший код, например, из кеша прокси. Нам следует проверить `db.version` и предложить ему перезагрузить страницу. А также проверить наши кеширующие заголовки, убедиться, что посетитель никогда не получит устаревший код.
=======
```warn header="We can't open an older version of the database"
If the current user database has a higher version than in the `open` call, e.g. the existing DB version is `3`, and we try to `open(...2)`, then that's an error, `openRequest.onerror` triggers.

That's rare, but such a thing may happen when a visitor loads outdated JavaScript code, e.g. from a proxy cache. So the code is old, but his database is new.

To protect from errors, we should check `db.version` and suggest a page reload. Use proper HTTP caching headers to avoid loading the old code, so that you'll never have such problems.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```

### Проблема параллельного обновления

Раз уж мы говорим про версионирование, рассмотрим связанную с этим небольшую проблему.

<<<<<<< HEAD
Допустим, посетитель открыл наш сайт во вкладке браузера, с базой версии 1.

Затем мы выкатили обновление, и тот же посетитель открыл наш сайт в другой вкладке. Так что есть две вкладки, на которых открыт наш сайт, но в одной открыто соединение с базой версии 1, а другая пытается обновить версию базы в обработчике `upgradeneeded`.

Проблема заключается в том, что база данных всего одна на две вкладки, так как это один и тот же сайт, один источник. И она не может быть одновременно версии 1 и 2. Чтобы обновить на версию 2, все соединения к версии 1 должны быть закрыты.

Чтобы это можно было организовать, при попытке обновления на объекте базы возникает событие `versionchange`. Нам нужно слушать его и закрыть соединение к базе (а также, возможно, предложить пользователю перезагрузить страницу, чтобы получить обновлённый код).

Если мы его не закроем, то второе, новое соединение будет заблокировано с событием `blocked` вместо `success`.

Код, который это делает:
=======
Let's say:
1. A visitor opened our site in a browser tab, with database version `1`.
2. Then we rolled out an update, so our code is newer.
3. And then the same visitor opens our site in another tab.

So there's a tab with an open connection to DB version `1`, while the second one attempts to update it to version `2` in its `upgradeneeded` handler.

The problem is that a database is shared between two tabs, as it's the same site, same origin. And it can't be both version `1` and `2`. To perform the update to version `2`, all connections to version 1 must be closed, including the one in the first tab.

In order to organize that, the `versionchange` event triggers on the "outdated" database object. We should listen for it and close the old database connection (and probably suggest a page reload, to load the updated code).

If we don't listen for the `versionchange` event and don't close the old connection, then the second, new connection won't be made. The `openRequest` object will emit the `blocked` event instead of `success`. So the second tab won't work.

Here's the code to correctly handle the parallel upgrade. It installs the `onversionchange` handler, that triggers if the current database connection becomes outdated (db version is updated elsewhere) and closes the connection.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
let openRequest = indexedDB.open("store", 2);

openRequest.onupgradeneeded = ...;
openRequest.onerror = ...;

openRequest.onsuccess = function() {
  let db = openRequest.result;

  *!*
  db.onversionchange = function() {
    db.close();
    alert("База данных устарела, пожалуста, перезагрузите страницу.")
  };
  */!*

  // ...база данных доступна как объект db...
};

*!*
openRequest.onblocked = function() {
<<<<<<< HEAD
  // есть другое соединение к той же базе
  // и оно не было закрыто после срабатывания на нём db.onversionchange 
=======
  // this event shouldn't trigger if we handle onversionchange correctly

  // it means that there's another open connection to the same database
  // and it wasn't closed after db.onversionchange triggered for it
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
};
*/!*
```

<<<<<<< HEAD
Здесь мы делаем две вещи:

1. Добавляем обработчик `db.onversionchange` после успешного открытия базы, чтобы узнать о попытке параллельного обновления.
2. Добавляем обработчик `openRequest.onblocked` для ситуаций, когда старое соединение не было закрыто. Такого не произойдёт, если мы закрываем его в `db.onversionchange`.

Есть и другие варианты. Например, мы можем более "мягко" закрыть соединение в `db.onversionchange`, предложить пользователю сохранить данные перед этим. Новое обновляющее соединение будет заблокировано сразу после того как обработчик `db.onversionchange` завершится, не закрыв соединение, и мы можем в новой вкладке попросить посетителя закрыть старые для обновления.

Такой конфликт при обновлении происходит редко, но мы должны как-то его обрабатывать, хотя бы поставить обработчик `onblocked`, чтобы наш скрипт не "умирал" молча, удивляя посетителя.
=======
...In other words, here we do two things:

1. The `db.onversionchange` listener informs us about a parallel update attempt, if the current database version becomes outdated.
2. The `openRequest.onblocked` listener informs us about the opposite situation: there's a connection to an outdated version elsewhere, and it doesn't close, so the newer connection can't be made.

We can handle things more gracefully in `db.onversionchange`, prompt the visitor to save the data before the connection is closed and so on. 

Or, an alternative approach would be to not close the database in `db.onversionchange`, but instead use the `onblocked` handler (in the new tab) to alert the visitor, tell him that the newer version can't be loaded until they close other tabs.

These update collisions happen rarely, but we should at least have some handling for them, at least an `onblocked` handler, to prevent our script from dying silently.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Хранилище объектов

<<<<<<< HEAD
Чтобы сохранить что-то в IndexedDB, нам нужно *хранилище объектов*.
=======
To store something in IndexedDB, we need an *object store*.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Хранилище объектов - это основная концепция IndexedDB. В других базах данных это "таблицы" или "коллекции". Здесь хранятся данные. В базе данных может быть множество хранилищ: одно для пользователей, другое для товаров и так далее.

Несмотря на то, что название -- "хранилище объектов", примитивы тоже могут там храниться.

**Мы можем хранить почти любое значение, в том числе сложные объекты.**

IndexedDB использует [стандартный алгоритм сериализации](https://www.w3.org/TR/html53/infrastructure.html#section-structuredserializeforstorage) для клонирования и хранения объекта. Это как `JSON.stringify`, но более мощный, способный хранить гораздо больше типов данных.

<<<<<<< HEAD
Пример объекта, который нельзя сохранить: объект с циклическими ссылками. Такие объекты не сериализуемы. `JSON.stringify` также выдаст ошибку при сериализации.
=======
An example of an object that can't be stored: an object with circular references. Such objects are not serializable. `JSON.stringify` also fails for such objects.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

**Каждому значению в хранилище должен соответствовать уникальный ключ.**     

<<<<<<< HEAD
Ключ должен быть одним из следующих типов: number, date, string, binary или array. Это уникальный идентификатор: по ключу мы можем искать/удалять/обновлять значения.
=======
A key must be one of these types - number, date, string, binary, or array. It's a unique identifier, so we can search/remove/update values by the key.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

![](indexeddb-structure.svg)

Как мы видим, можно указать ключ при добавлении значения в хранилище, аналогично `localStorage`. Но когда мы храним объекты, IndexedDB позволяет установить свойство объекта в качестве ключа, что гораздо удобнее. Или мы можем автоматически сгенерировать ключи.

<<<<<<< HEAD
Но для начала нужно создать хранилище.
=======
As we'll see very soon, we can provide a key when we add a value to the store, similar to `localStorage`. But when we store objects, IndexedDB allows setting up an object property as the key, which is much more convenient. Or we can auto-generate keys.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Синтаксис для создания хранилища объектов:
```js
db.createObjectStore(name[, keyOptions]);
```

Обратите внимание, что операция является синхронной, использование `await` не требуется.

- `name` - это название хранилища, например `"books"` для книг,
- `keyOptions` - это необязательный объект с одним или двумя свойствами:
  - `keyPath` -- путь к свойству объекта, которое IndexedDB будет использовать в качестве ключа, например `id`.
  - `autoIncrement` -- если `true`, то ключ будет формироваться автоматически для новых объектов, как постоянно увеличивающееся число.

Если при создании хранилища не указать `keyOptions`, то нам потребуется явно указать ключ позже, при сохранении объекта.

Например, это хранилище объектов использует свойство `id` как ключ:
```js
db.createObjectStore('books', {keyPath: 'id'});
```

**Хранилище объектов можно создавать/изменять только при обновлении версии базы данных в обработчике `upgradeneeded`.**

<<<<<<< HEAD
Это техническое ограничение. Вне обработчика мы сможем добавлять/удалять/обновлять данные, но хранилища объектов могут быть созданы/удалены/изменены только во время обновления версии базы данных.

Для обновления версии базы есть два основных подхода:
1. Мы можем реализовать функции обновления по версиям: с 1 на 2, с 2 на 3 и т.д. Потом в `upgradeneeded` сравнить версии (например, была 2, сейчас 4) и запустить операции обновления для каждой промежуточной версии (2 на 3, затем 3 на 4).
2. Или мы можем взять список существующих хранилищ объектов, используя `db.objectStoreNames`. Этот объект является [DOMStringList](https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#domstringlist), в нём есть метод `contains(name)`, используя который можно проверить существование хранилища. Посмотреть, какие хранилища есть и создать те, которых нет.
=======
That's a technical limitation. Outside of the handler we'll be able to add/remove/update the data, but object stores can only be created/removed/altered during a version update.

To perform a database version upgrade, there are two main approaches:
1. We can implement per-version upgrade functions: from 1 to 2, from 2 to 3, from 3 to 4 etc. Then, in `upgradeneeded` we can compare versions (e.g. old 2, now 4) and run per-version upgrades step by step, for every intermediate version (2 to 3, then 3 to 4).
2. Or we can just examine the database: get a list of existing object stores as `db.objectStoreNames`. That object is a [DOMStringList](https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#domstringlist) that provides `contains(name)` method to check for existance. And then we can do updates depending on what exists and what doesn't.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Для простых баз данных второй подход может быть проще и предпочтительнее.

Вот демонстрация второго способа:

```js
let openRequest = indexedDB.open("db", 2);

// создаём хранилище объектов для books, если ешё не существует
openRequest.onupgradeneeded = function() {
  let db = openRequest.result;
  if (!db.objectStoreNames.contains('books')) { // если хранилище "books" не существует
    db.createObjectStore('books', {keyPath: 'id'}); // создаем хранилище
  }
};
```


Чтобы удалить хранилище объектов:

```js
db.deleteObjectStore('books')
```

## Транзакции

Термин "транзакция" является общеизвестным, транзакции используются во многих видах баз данных.

<<<<<<< HEAD
Транзакция - это группа операций, которые должны быть или все выполнены, или все не выполнены (всё или ничего).

Например, когда пользователь что-то покупает, нам нужно:
1. Вычесть деньги с его счёта.
2. Отправить ему покупку.
=======
A transaction is a group of operations, that should either all succeed or all fail.

For instance, when a person buys something, we need to:
1. Subtract the money from their account.
2. Add the item to their inventory.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Будет очень плохо, если мы успеем завершить первую операцию, а затем что-то пойдёт не так, например отключат электричество, и мы не сможем завершить вторую операцию. Обе операции должны быть успешно завершены (покупка сделана, отлично!) или необходимо отменить обе операции (в этом случае пользователь сохранит свои деньги и может попытаться купить ещё раз).

Транзакции гарантируют это.

**Все операции с данными в IndexedDB могут быть сделаны только внутри транзакций.**

Для начала транзакции:

```js
db.transaction(store[, type]);
```

- `store` - это название хранилища, к которому транзакция получит доступ, например, `"books"`. Может быть массивом названий, если нам нужно предоставить доступ к нескольким хранилищам.
- `type` – тип транзакции, один из:
  - `readonly` -- только чтение, по умолчанию.
  - `readwrite` -- только чтение и запись данных, создание/удаление самих хранилищ объектов недоступно.

Есть ещё один тип транзакций: `versionchange`. Такие транзакции могут делать любые операции, но мы не можем создать их вручную. IndexedDB автоматически создаёт транзакцию типа `versionchange`, когда открывает базу данных, для обработчика `updateneeded`. Вот почему это единственное место, где мы можем обновлять структуру базы данных, создавать/удалять хранилища объектов.

<<<<<<< HEAD
```smart header="Почему существует несколько типов транзакций?"
Производительность является причиной, почему транзакции необходимо помечать как `readonly` или `readwrite`.

Несколько readonly транзакций могут одновременно работать с одним и тем же хранилищем объектов, а readwrite транзакций - не могут. Транзакции типа readwrite "блокируют" хранилище для записи. Следующая такая транзакция должна дождаться выполнения предыдущей, перед тем как получит доступ к тому же самому хранилищу.
=======
```smart header="Why are there different types of transactions?"
Performance is the reason why transactions need to be labeled either `readonly` and `readwrite`.

Many `readonly` transactions are able to access the same store concurrently, but `readwrite` transactions can't. A `readwrite` transaction "locks" the store for writing. The next transaction must wait before the previous one finishes before accessing the same store.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```

После того, как транзакция будет создана, мы можем добавить элемент в хранилище, вот так:

```js
let transaction = db.transaction("books", "readwrite"); // (1)

// получить хранилище объектов для работы с ним
*!*
let books = transaction.objectStore("books"); // (2)
*/!*

let book = {
  id: 'js',
  price: 10,
  created: new Date()
};

*!*
let request = books.add(book); // (3)
*/!*

request.onsuccess = function() { // (4)
  console.log("Книга добавлена в хранилище", request.result);
};

request.onerror = function() {
  console.log("Ошибка", request.error);
};
```

Мы сделали четыре шага:

<<<<<<< HEAD
1. Создать транзакцию и указать все хранилища, к которым необходим доступ, строка `(1)`.
2. Получить хранилище объектов, используя `transaction.objectStore(name)`, строка `(2)`.
3. Выполнить запрос на добавление элемента в хранилище объектов `books.add(book)`, строка `(3)`.
4. ...Обработать результат запроса `(4)`, затем мы можем выполнить другие запросы и так далее.
=======
1. Create a transaction, mentioning all the stores it's going to access, at `(1)`.
2. Get the store object using `transaction.objectStore(name)`, at `(2)`.
3. Perform the request to the object store `books.add(book)`, at `(3)`.
4. ...Handle request success/error `(4)`, then we can make other requests if needed, etc.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Хранилища объектов поддерживают два метода для добавления значений:

- **put(value, [key])**
<<<<<<< HEAD
    Добавляет значение `value` в хранилище. Ключ `key` необходимо указать, если при создании хранилища объектов не было указано свойство `keyPath` или `autoIncrement`. Если уже есть значение с таким же ключом, то оно будет заменено.
=======
    Add the `value` to the store. The `key` is supplied only if the object store did not have `keyPath` or `autoIncrement` option. If there's already a value with the same key, it will be replaced.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

- **add(value, [key])**
    То же, что `put`, но если уже существует значение с таким ключом, то запрос не выполнится, будет сгенерирована ошибка с названием `"ConstraintError"`.

Аналогично открытию базы, мы отправляем запрос: `books.add(book)` и после ожидаем события `success/error`.

- `request.result` для `add` является ключом нового объекта.
- Ошибка находится в `request.error` (если есть).

## Автоматическая фиксация транзакций

<<<<<<< HEAD
В примере выше мы запустили транзакцию и выполнили запрос `add`. Но, как говорилось ранее, транзакция может включать в себя несколько запросов, которые все вместе должны либо успешно завершиться, либо нет. Как нам закончить транзакцию, обозначить, что больше запросов в ней не будет?
=======
In the example above we started the transaction and made `add` request. But as we stated previously, a transaction may have multiple associated requests, that must either all succeed or all fail. How do we mark the transaction as finished, with no more requests to come?
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Короткий ответ: этого не требуется.

В следующей 3.0 версии спецификации, вероятно, будет возможность вручную завершить транзакцию, но сейчас, в версии 2.0, такой возможности нет.

**Когда все запросы завершены и [очередь микрозадач](info:microtask-queue) пуста, тогда транзакция завершится автоматически.**

Как правило, это означает, что транзакция автоматически завершается, когда выполнились все её запросы и завершился текущий код.

Таким образом, в приведённом выше примере не требуется никакой специальный вызов, чтобы завершить транзакцию.

<<<<<<< HEAD
Такое автозавершение транзакций имеет важный побочный эффект. Мы не можем вставить асинхронную операцию, такую как `fetch` или `setTimeout` в середину транзакции. IndexedDB никак не заставит транзакцию "висеть" и ждать их выполнения.

В приведённом ниже коде в запросе `request2` в строке с `(*)` будет ошибка, потому что транзакция уже завершена, больше нельзя выполнить в ней запрос:
=======
Transactions auto-commit principle has an important side effect. We can't insert an async operation like `fetch`, `setTimeout` in the middle of a transaction. IndexedDB will not keep the transaction waiting till these are done.

In the code below, `request2` in the line `(*)` fails, because the transaction is already committed, and can't make any request in it:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
let request1 = books.add(book);

request1.onsuccess = function() {
  fetch('/').then(response => {
*!*
    let request2 = books.add(anotherBook); // (*)
*/!*
    request2.onerror = function() {
      console.log(request2.error.name); // TransactionInactiveError
    };
  });
};
```

Всё потому, что `fetch` является асинхронной операцией, макрозадачей. Транзакции завершаются раньше, чем браузер приступает к выполнению макрозадач.

Авторы спецификации IndexedDB из соображений производительности считают, что транзакции должны завершаться быстро.

<<<<<<< HEAD
В частности, `readwrite` транзакции "блокируют" хранилища от записи. Таким образом, если одна часть приложения инициирует `readwrite` транзакцию в хранилище объектов `books`, то другая часть приложения, которая хочет сделать то же самое, должна ждать: новая транзакция "зависает" до завершения первой. Это может привести к странным задержкам, если транзакции слишком долго выполняются.
=======
Notably, `readwrite` transactions "lock" the stores for writing. So if one part of the application initiated `readwrite` on `books` object store, then another part that wants to do the same has to wait: the new transaction "hangs" till the first one is done. That can lead to strange delays if transactions take a long time.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Что же делать?

В приведённом выше примере мы могли бы запустить новую транзакцию `db.transaction` перед новым запросом `(*)`.

Но ещё лучше выполнять операции вместе, в рамках одной транзакции: отделить транзакции IndexedDB от других асинхронных операций.

Сначала сделаем `fetch`, подготовим данные, если нужно, затем создадим транзакцию и выполним все запросы к базе данных.

Чтобы поймать момент успешного выполнения, мы можем повесить обработчик на событие `transaction.oncomplete`:

```js
let transaction = db.transaction("books", "readwrite");

// ...выполнить операции...

transaction.oncomplete = function() {
  console.log("Транзакция выполнена");
};
```

Только `complete` гарантирует, что транзакция сохранена целиком. По отдельности запросы могут выполниться, но при финальной записи что-то может пойти не так (ошибка ввода-вывода, проблема с диском, например).

Чтобы вручную отменить транзакцию, выполните:

```js
transaction.abort();
```

Это отменит все изменения, сделанные запросами в транзакции, и сгенерирует событие `transaction.onabort`.


## Обработка ошибок

Запросы на запись могут выполниться неудачно.

Мы должны быть готовы к этому, не только из-за возможных ошибок на нашей стороне, но и по причинам, которые не связаны с транзакцией. Например, размер хранилища может быть превышен. И мы должны быть готовы обработать такую ситуацию.

**При ошибке в запросе соответствующая транзакция отменяется полностью, включая изменения, сделанные другими её запросами.**

Если мы хотим продолжить транзакцию (например, попробовать другой запрос без отмены изменений), это также возможно. Для этого в обработчике `request.onerror` следует вызвать `event.preventDefault()`.

В примере ниже новая книга добавляется с тем же ключом (`id`), что и существующая. Метод `store.add` генерирует в этом случае ошибку `"ConstraintError"`. Мы обрабатываем её без отмены транзакции:

```js
let transaction = db.transaction("books", "readwrite");

let book = { id: 'js', price: 10 };

let request = transaction.objectStore("books").add(book);

request.onerror = function(event) {
  // ConstraintError возникает при попытке добавить объект с ключом, который уже существует
  if (request.error.name == "ConstraintError") {
    console.log("Книга с таким id уже существует"); // обрабатываем ошибку
    event.preventDefault(); // предотвращаем отмену транзакции
    // ...можно попробовать использовать другой ключ...
  } else {
    // неизвестная ошибка
    // транзакция будет отменена
  }
};

transaction.onabort = function() {
  console.log("Ошибка", transaction.error);
};
```

### Делегирование событий

Нужны ли обработчики onerror/onsuccess для каждого запроса? Не всегда. Мы можем использовать делегирование событий.

**События IndexedDB всплывают: `запрос` -> `транзакция` -> `база данных`.**

Все события являются DOM-событиями с фазами перехвата и всплытия, но обычно используется только всплытие.

Поэтому мы можем перехватить все ошибки, используя обработчик `db.onerror`, для оповещения пользователя или других целей:

```js
db.onerror = function(event) {
  let request = event.target; // запрос, в котором произошла ошибка

  console.log("Ошибка", request.error);
};
```

...А если мы полностью обработали ошибку? В этом случае мы не хотим сообщать об этом.

Мы можем остановить всплытие и, следовательно, `db.onerror`, используя `event.stopPropagation()` в `request.onerror`.

```js
request.onerror = function(event) {
  if (request.error.name == "ConstraintError") {
    console.log("Книга с таким id уже существует"); // обрабатываем ошибку
    event.preventDefault(); // предотвращаем отмену транзакции
    event.stopPropagation(); // предотвращаем всплытие ошибки
  } else {
    // ничего не делаем
    // транзакция будет отменена
    // мы можем обработать ошибку в transaction.onabort
  }
};
```

<<<<<<< HEAD
## Поиск по ключам

Есть два основных вида поиска в хранилище объектов:
1. По ключу или по диапазону ключей. То есть: по `book.id` в хранилище "books".
2. По полям объекта, например, `book.price`.

Сначала давайте разберёмся с ключами и диапазоном ключей `(1)`.

Методы поиска поддерживают либо точные ключи, либо так называемые "запросы с диапазоном" -- [IDBKeyRange](https://www.w3.org/TR/IndexedDB/#keyrange) объекты, которые задают "диапазон ключей".

Диапазоны создаются с помощью следующих вызовов:

- `IDBKeyRange.lowerBound(lower, [open])` означает: `>lower` (или `≥lower`, если `open` это true)
- `IDBKeyRange.upperBound(upper, [open])` означает: `<upper` (или `≤upper`, если `open` это true)
- `IDBKeyRange.bound(lower, upper, [lowerOpen], [upperOpen])` означает: между `lower` и `upper`, включительно, если соответствующий `open` равен `true`.
- `IDBKeyRange.only(key)` -- диапазон, который состоит только из одного ключа `key`, редко используется.

Все методы поиска принимают аргумент `query`, который может быть либо точным ключом, либо диапазоном ключей:
=======
## Searching

There are two main types of search in an object store:

1. By a key value or a key range. In our "books" storage that would be a value or range of values of `book.id`.
2. By another object field, e.g. `book.price`. This required an additional data structure, named "index".

### By key

First let's deal with the first type of search: by key.

Searching methods support both exact key values and so-called "ranges of values" -- [IDBKeyRange](https://www.w3.org/TR/IndexedDB/#keyrange) objects that specify an acceptable "key range".

`IDBKeyRange` objects are created using following calls:

- `IDBKeyRange.lowerBound(lower, [open])` means: `≥lower` (or `>lower` if `open` is true)
- `IDBKeyRange.upperBound(upper, [open])` means: `≤upper` (or `<upper` if `open` is true)
- `IDBKeyRange.bound(lower, upper, [lowerOpen], [upperOpen])` means: between `lower` and `upper`. If the open flags is true, the corresponding key is not included in the range.
- `IDBKeyRange.only(key)` -- a range that consists of only one `key`, rarely used.

We'll see practical examples of using them very soon.

To perform the actual search, there are following methods. They accept a `query` argument that can be either an exact key or a key range:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

- `store.get(query)` -- поиск первого значения по ключу или по диапазону.
- `store.getAll([query], [count])` -- поиск всех значений, можно ограничить, передав `count`.
- `store.getKey(query)` -- поиск первого ключа, который удовлетворяет запросу, обычно передаётся диапазон.
- `store.getAllKeys([query], [count])` -- поиск всех ключей, которые удовлетворяют запросу, обычно передаётся диапазон, возможно ограничить поиск, передав `count`.
- `store.count([query])` -- получить общее количество ключей, которые удовлетворяют запросу, обычно передаётся диапазон.

Например, в хранилище у нас есть множество книг. Помните, поле `id` является ключом, поэтому все эти методы могут искать по ключу `id`.

Примеры запросов:

```js
// получить одну книгу
books.get('js')

<<<<<<< HEAD
// получить все книги с 'css' < id < 'html'
books.getAll(IDBKeyRange.bound('css', 'html'))

// получить книги с 'html' <= id
books.getAll(IDBKeyRange.lowerBound('html', true))
=======
// get books with 'css' <= id <= 'html'
books.getAll(IDBKeyRange.bound('css', 'html'))

// get books with id < 'html'
books.getAll(IDBKeyRange.upperBound('html', true))
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

// получить все книги
books.getAll()

<<<<<<< HEAD
// получить все ключи: id >= 'js'
books.getAllKeys(IDBKeyRange.lowerBound('js', true))
```

```smart header="Хранилище объектов всегда отсортировано"
Хранилище объектов внутренне сортирует значения по ключам.
=======
// get all keys, where id > 'js'
books.getAllKeys(IDBKeyRange.lowerBound('js', true))
```

```smart header="Object store is always sorted"
An object store sorts values by key internally.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Поэтому запросы, которые возвращают много значений, всегда возвращают их в порядке сортировки по ключу.
```

<<<<<<< HEAD

## Поиск по индексированному полю
=======
### By a field using an index
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Для поиска по другим полям объекта нам нужно создать дополнительную структуру данных, называемую "индекс" (index).

Индекс является "расширением" к хранилищу, которое отслеживает данное поле объекта. Для каждого значения этого поля хранится список ключей для объектов, которые имеют это значение. Ниже будет более подробная картина.

Синтаксис:

```js
objectStore.createIndex(name, keyPath, [options]);
```

- **`name`** -- название индекса,
- **`keyPath`** -- путь к полю объекта, которое индекс должен отслеживать (мы собираемся сделать поиск по этому полю),
- **`option`** -- необязательный объект со свойствами:
  - **`unique`** -- если true, тогда в хранилище может быть только один объект с заданным значением в `keyPath`. Если мы попытаемся добавить дубликат, то индекс сгенерирует ошибку.
  - **`multiEntry`** -- используется только, если `keyPath` является массивом. В этом случае, по умолчанию, индекс обрабатывает весь массив как ключ. Но если мы укажем true в `multiEntry`, тогда индекс будет хранить список объектов хранилища для каждого значения в этом массиве. Таким образом, элементы массива становятся ключами индекса.

В нашем примере мы храним книги с ключом `id`.

Допустим, мы хотим сделать поиск по полю `price`.

Сначала нам нужно создать индекс. Индексы должны создаваться в `upgradeneeded`, как и хранилище объектов:

```js
openRequest.onupgradeneeded = function() {
  // мы должны создать индекс здесь, в versionchange транзакции
  let books = db.createObjectStore('books', {keyPath: 'id'});
*!*
  let index = books.createIndex('price_idx', 'price');
*/!*
};
```

- Индекс будет отслеживать поле `price`.
- Поле price не уникальное, у нас может быть несколько книг с одинаковой ценой, поэтому мы не устанавливаем опцию `unique`.
- Поле price не является массивом, поэтому флаг `multiEntry` не применим.

Представим, что в нашем `inventory` есть 4 книги. Вот картинка, которая показывает, что такое "индекс".

![](indexeddb-index.svg)

Как уже говорилось, индекс для каждого значения `price` (второй аргумент) хранит список ключей, имеющих эту цену.

Индексы автоматически обновляются, нам не нужно об этом заботиться.

Сейчас, когда мы хотим найти объект по цене, мы просто применяем те же методы поиска к индексу:

```js
let transaction = db.transaction("books"); // readonly
let books = transaction.objectStore("books");
let priceIndex = books.index("price_idx");

*!*
let request = priceIndex.getAll(10);
*/!*

request.onsuccess = function() {
  if (request.result !== undefined) {
    console.log("Книги", request.result); // массив книг с ценой 10
  } else {
    console.log("Нет таких книг");
  }
};
```

Мы также можем использовать `IDBKeyRange`, чтобы создать диапазон и найти дешёвые/дорогие книги:

```js
<<<<<<< HEAD
// найдём книги, где цена < 5
=======
// find books where price <= 5
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
let request = priceIndex.getAll(IDBKeyRange.upperBound(5));
```

Индексы внутренне отсортированы по полю отслеживаемого объекта, в нашем случае по `price`. Поэтому результат поиска будет уже отсортированный по полю `price`.

## Удаление из хранилища

Метод `delete` удаляет значения по запросу, формат вызова такой же как в `getAll`:

- **`delete(query)`** -- производит удаление соответствующих запросу значений.

Например:
```js
// удалить книгу с id='js'
books.delete('js');
```

Если нам нужно удалить книги, основываясь на цене или на любом другом поле, сначала нам надо найти ключ в индексе, а затем выполнить `delete`:

```js
// найдём ключ, где цена = 5
let request = priceIndex.getKey(5);

request.onsuccess = function() {
  let id = request.result;
  let deleteRequest = books.delete(id);
};
```

Чтобы удалить всё:
```js
books.clear(); // очищаем хранилище.
```

## Курсоры

Такие методы как `getAll/getAllKeys` возвращают массив ключей/значений.

Но хранилище объектов может быть огромным, больше, чем доступно памяти.

Тогда метод `getAll` вернёт ошибку при попытке получить все записи в массиве.

Что делать?

Курсоры предоставляют возможности для работы в таких ситуациях.

**Объект *cursor* идёт по хранилищу объектов с заданным запросом (query) и возвращает пары ключ/значение по очереди, а не все сразу. Это позволяет экономить память.**

Так как хранилище объектов внутренне отсортировано по ключу, курсор проходит по хранилищу в порядке хранения ключей (по возрастанию по умолчанию).

Синтаксис:
```js
// как getAll, но с использованием курсора:
let request = store.openCursor(query, [direction]);

// чтобы получить ключи, не значения (как getAllKeys): store.openKeyCursor
```

- **`query`** ключ или диапазон ключей, как для `getAll`.
- **`direction`** необязательный аргумент, доступные значения:
  - `"next"` -- по умолчанию, курсор будет проходить от самого маленького ключа к большему.
  - `"prev"` -- обратный порядок: от самого большого ключа к меньшему.
  - `"nextunique"`, `"prevunique"` -- то же самое, но курсор пропускает записи с тем же ключом, что уже был (только для курсоров по индексам, например, для нескольких книг с price=5, будет возвращена только первая).

**Основным отличием курсора является то, что `request.onsuccess` генерируется многократно: один раз для каждого результата.**

Вот пример того, как использовать курсор:

```js
let transaction = db.transaction("books");
let books = transaction.objectStore("books");

let request = books.openCursor();

// вызывается для каждой найденной курсором книги
request.onsuccess = function() {
  let cursor = request.result;
  if (cursor) {
    let key = cursor.key; // ключ книги (поле id)
    let value = cursor.value; // объект книги
    console.log(key, value);
    cursor.continue();
  } else {
    console.log("Книг больше нет");
  }
};
```

Основные методы курсора:

- `advance(count)` -- продвинуть курсор на `count` позиций, пропустив значения.
- `continue([key])` -- продвинуть курсор к следующему значению в диапазоне соответствия (или до позиции сразу после ключа key, если указан).

Независимо от того, есть ли ещё значения, соответствующие курсору или нет - вызывается `onsuccess`, затем в` result` мы можем получить курсор, указывающий на следующую запись или равный `undefined`.

В приведённом выше примере курсор был создан для хранилища объектов.

<<<<<<< HEAD
Но мы также можем создать курсор для индексов. Как мы помним, индексы позволяют искать по полю объекта. Курсоры для индексов работают так же, как для хранилищ объектов -- они позволяют экономить память, возвращая одно значение в единицу времени.
=======
But we also can make a cursor over an index. As we remember, indexes allow to search by an object field. Cursors over indexes do precisely the same as over object stores -- they save memory by returning one value at a time.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Для курсоров по индексам `cursor.key` является ключом индекса (например price), нам следует использовать свойство `cursor.primaryKey` как ключ объекта:

```js
let request = priceIdx.openCursor(IDBKeyRange.upperBound(5));

// вызывается для каждой записи
request.onsuccess = function() {
  let cursor = request.result;
  if (cursor) {
<<<<<<< HEAD
    let key = cursor.primaryKey; // следующий ключ в хранилище объектов (поле id)
    let value = cursor.value; // следующее значение в хранилище объектов (объект "книга")
    let key = cursor.key; // следующий ключ индекса (price)
=======
    let primaryKey = cursor.primaryKey; // next object store key (id field)
    let value = cursor.value; // next object store object (book object)
    let key = cursor.key; // next index key (price)
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    console.log(key, value);
    cursor.continue();
  } else {
    console.log("Книг больше нет");
  }
};
```

## Обёртка для промисов

Добавлять к каждому запросу `onsuccess/onerror` немного громоздко. Мы можем сделать нашу жизнь проще, используя делегирование событий, например, установить обработчики на все транзакции, но использовать `async/await` намного удобнее.

Давайте далее в главе использовать небольшую обёртку над промисами <https://github.com/jakearchibald/idb>. Она создаёт глобальный `idb` объект с [промисифицированными](info:promisify) IndexedDB методами.

Тогда вместо `onsuccess/onerror` мы можем писать примерно так:

```js
let db = await idb.openDB('store', 1, db => {
  if (db.oldVersion == 0) {
    // выполняем инициализацию
    db.createObjectStore('books', {keyPath: 'id'});
  }
});

let transaction = db.transaction('books', 'readwrite');
let books = transaction.objectStore('books');

try {
  await books.add(...);
  await books.add(...);

  await transaction.complete;

  console.log('сохранено');
} catch(err) {
  console.log('ошибка', err.message);
}

```

Теперь у нас красивый "плоский асинхронный" код и, конечно, будет работать `try..catch`.

### Обработка ошибок

Если мы не перехватим ошибку, то она "вывалится" наружу, вверх по стеку вызовов, до ближайшего внешнего `try..catch`.

Необработанная ошибка становится событием "unhandled promise rejection" в объекте `window`.

Мы можем обработать такие ошибки вот так:

```js
window.addEventListener('unhandledrejection', event => {
  let request = event.target; // объект запроса IndexedDB
  let error = event.reason; //  Необработанный объект ошибки, как request.error
  ...сообщить об ошибке...
});
```

### Подводный камень: "Inactive transaction"

Как мы уже знаем, транзакции автоматически завершаются, как только браузер завершает работу с текущим кодом и макрозадачу. Поэтому, если мы поместим *макрозадачу* наподобие `fetch` в середину транзакции, транзакция не будет ожидать её завершения. Произойдёт автозавершение транзакции. Поэтому при следующем запросе возникнет ошибка.

Для промисифицирующей обёртки и `async/await` поведение такое же.

Вот пример `fetch` в середине транзакции:

```js
let transaction = db.transaction("inventory", "readwrite");
let inventory = transaction.objectStore("inventory");

await inventory.add({ id: 'js', price: 10, created: new Date() });

await fetch(...); // (*)

await inventory.add({ id: 'js', price: 10, created: new Date() }); // Ошибка
```

Следующий `inventory.add` после `fetch` `(*)` не сработает, сгенерируется ошибка "inactive transaction", потому что транзакция уже завершена и закрыта к этому времени.

<<<<<<< HEAD
Решение такое же, как при работе с обычным IndexedDB: либо создать новую транзакцию, либо разделить задачу на части.
1. Подготовить данные и получить всё, что необходимо.
2. Затем сохранить в базу данных.
=======
The workaround is the same as when working with native IndexedDB: either make a new transaction or just split things apart.
1. Prepare the data and fetch all that's needed first.
2. Then save in the database.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

### Получение встроенных объектов

Внутренне обёртка выполняет встроенные IndexedDB запросы, добавляя к ним `onerror/onsuccess`, и возвращает промисы, которые отклоняются или выполняются с переданным результатом.

Это работает в большинстве случаев. Примеры можно увидеть на странице библиотеки <https://github.com/jakearchibald/idb>.

В некоторых редких случаях, когда нам нужен оригинальный объект `request`, мы можем получить в нему доступ, используя свойство `promise.request`:

```js
let promise = books.add(book); // получаем промис (без await, не ждём результата)

let request = promise.request; // встроенный объект запроса
let transaction = request.transaction; // встроенный объект транзакции

// ...работаем с IndexedDB...

let result = await promise; // если ещё нужно
```

## Итого

IndexedDB можно рассматривать как "localStorage на стероидах". Это простая база данных типа ключ-значение, достаточно мощная для оффлайн приложений, но простая в использовании.

<<<<<<< HEAD
Лучшим руководством является спецификация, [текущая версия 2.0](https://w3c.github.io/IndexedDB), но также поддерживаются несколько методов из [3.0](https://w3c.github.io/IndexedDB/) (не так много отличий) версии.
=======
The best manual is the specification, [the current one](https://www.w3.org/TR/IndexedDB-2/) is 2.0, but few methods from [3.0](https://w3c.github.io/IndexedDB/) (it's not much different) are partially supported.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Использование можно описать в нескольких фразах:

1. Подключить обёртку над промисами, например [idb](https://github.com/jakearchibald/idb).
2. Открыть базу данных: `idb.openDb(name, version, onupgradeneeded)`
    - Создание хранилищ объектов и индексов происходит в обработчике `onupgradeneeded`.
    - Обновление версии - либо сравнивая номера версий, либо можно проверить что существует, а что нет.
3. Для запросов:
    - Создать транзакцию `db.transaction('books')` (можно указать readwrite, если надо).
    - Получить хранилище объектов `transaction.objectStore('books')`.
4. Затем для поиска по ключу вызываем методы непосредственно у хранилища объектов.
    - Для поиска по любому полю объекта создайте индекс.
5. Если данные не помещаются в памяти, то используйте курсор.

Демо-приложение:

[codetabs src="books" current="index.html"]
