
```js no-beautify
"" + 1 + 0 = "10" // (1)
"" - 1 + 0 = -1 // (2)
true + false = 1
6 / "3" = 2
"2" * "3" = 6
4 + 5 + "px" = "9px"
"$" + 4 + 5 = "$45"
"4" - 2 = 2
"4px" - 2 = NaN
7 / 0 = Infinity
" -9  " + 5 = " -9  5" // (3)
" -9  " - 5 = -14 // (4)
null + 1 = 1 // (5)
undefined + 1 = NaN // (6)
" \t \n" - 2 = -2 // (7)
```

<<<<<<< HEAD
1. Сложение со строкой `"" + 1` преобразует `1` к строке: `"" + 1 = "1"`, и в следующем случае `"1" + 0`, работает то же самое правило.
2. Вычитание `-` (как и большинство математических операторов) работает только с числами, пустая строка `""` приводится к `0`.
3. Сложение со строкой превращает число `5` в строку и добавляет к строке.
4. Вычитание всегда преобразует к числу, значит строка `"  -9  "` становится числом `-9` (пробелы по краям обрезаются).
5. `null` становится `0` после численного преобразования.
6. `undefined` становится `NaN` после численного преобразования.
7. Пробельные символы, такие как `\t` и `\n` по краям строки игнорируются при преобразовании в число, так что строка `\t \n`, аналогично пустой строке, становится `0` после численного преобразования.
=======
1. The addition with a string `"" + 1` converts `1` to a string: `"" + 1 = "1"`, and then we have `"1" + 0`, the same rule is applied.
2. The subtraction `-` (like most math operations) only works with numbers, it converts an empty string `""` to `0`.
3. The addition with a string appends the number `5` to the string.
4. The subtraction always converts to numbers, so it makes `"  -9  "` a number `-9` (ignoring spaces around it).
5. `null` becomes `0` after the numeric conversion.
6. `undefined` becomes `NaN` after the numeric conversion.
7. Space characters, are trimmed off string start and end when a string is converted to a number. Here the whole string consists of space characters, such as `\t`, `\n` and a "regular" space between them. So, similarly to an empty string, it becomes `0`.
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927
