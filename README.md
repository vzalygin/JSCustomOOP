# JSCustomOOP

## Что здесь происходит?

Однажды я узнал про производные функции, и в могу голову закралась одна крамольная мысль: реализовать ООП в стиле C# или Java на основе этих самых производных функций.

## Примеры

В данном примере создаётся два объекта типа дробь и производится их сложение:
```javascript
const fraction1 = New(Fraction(2, 3));
const fraction2 = New(Fraction(1, 3));
const fraction3 = fraction1("AddFraction", fraction2);
console.log(fraction1("GetType")); // Fraction
console.log(fraction1("Equals", fraction2)); // false
console.log(fraction3("GetNumerator") + " " + fraction3("GetDenominator")); // 3 3
```

Как создать собственный тип:
```javascript
// WiP
```

## План работ


- [X] Создание объектов
- [X] Объект Obj
- [ ] Наследование
- [ ] Объект Type
- [ ] etc
