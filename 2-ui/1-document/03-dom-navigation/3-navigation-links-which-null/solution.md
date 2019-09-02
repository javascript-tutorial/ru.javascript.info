<<<<<<< HEAD
1. Да. Верно. Элемент `elem.lastChild` всегда последний, у него нет ссылки `nextSibling`.
2. Нет. Неверно. Потому что `elem.children[0]` -- потомок-элемент. Но перед ним могут быть другие узлы. Например, `previousSibling` может быть текстовым узлом.
=======
1. Yes, true. The element `elem.lastChild` is always the last one, it has no `nextSibling`.
2. No, wrong, because `elem.children[0]` is the first child *among elements*. But there may exist non-element nodes before it. So `previousSibling` may be a text node.
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

Обратите внимание, что в обоих случаях, если детей нет, то будет ошибка. При этом `elem.lastChild` равен `null`, а значит -- ошибка при попытке доступа к `elem.lastChild.nextSibling`.
