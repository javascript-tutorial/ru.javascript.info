

```js no-beautify
5 > 4 → true
"apple" > "pineapple" → false
"2" > "12" → true 
undefined == null → true 
undefined === null → false 
null == "\n0\n" → false
null === +"\n0\n" → false 
```

Some of the reasons:

1. Obviously, true.
2. Dictionary comparison, hence false.
3. Again, dictionary comparison, first char of `"2"` is greater than the first char of `"1"`.
4. Values `null` and `undefined` equal each other only.
5. Strict equality is strict. Different types from both sides lead to false.
6. See (4).
7. Strict equality of different types.
