
We can see which class it belongs by outputting it, like:

```js run
alert(document); // [object HTMLDocument]
```

Or:

```js run
alert(document.constructor.name); // HTMLDocument
```

So, `document` is an instance of `HTMLDocument` class.

What's its place in the hierarchy?

Yeah, we could browse the specification, but it would be faster to figure out manually.

Let's traverse the prototype chain via `__proto__`.

As we know, methods of a class are in the `prototype` of the constructor. For instance, `HTMLDocument.prototype` has methods for documents.

Also, there's a reference to the constructor function inside the `prototype`:

```js run
alert(HTMLDocument.prototype.constructor === HTMLDocument); // true
```

For built-in classes in all prototypes there's a `constructor` reference, and we can get `constructor.name` to see the name of the class. Let's do it for all objects in the `document` prototype chain:

```js run
alert(HTMLDocument.prototype.constructor.name); // HTMLDocument
alert(HTMLDocument.prototype.__proto__.constructor.name); // Document
alert(HTMLDocument.prototype.__proto__.__proto__.constructor.name); // Node
```

We also could examine the object using `console.dir(document)` and see these names by opening `__proto__`. The console takes them from `constructor` internally.
