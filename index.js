const fraction1 = New(Fraction(2, 3));
const fraction2 = New(Fraction(1, 3));
console.log(fraction1("GetType"));
console.log(fraction1("Equals", fraction2));
const fraction3 = fraction1("AddFraction", fraction2);
console.log(fraction3("GetNumerator") + " " + fraction3("GetDenominator"));

function Fraction(numerator, denominator) { 
    const base = Extend(Obj()); // Применяем наследование от Obj

    const [GetNumerator, GetDenominator, AddFraction, Equals, Getter, GetType, Euclidean, TypeEquals, GetPublicMap, GetProtectedMap] =
        ["GetNumerator", "GetDenominator", "AddFraction", "Equals", "Getter", "GetType", "Euclidean", "TypeEquals", "GetPublicMap", "GetProtectedMap"];
    const _numerator = numerator;
    const _denominator = denominator;
    const _type = "Fraction";

    const public = base(GetPublicMap) // Забираем к себе публичные методы base
        .set(GetNumerator, () => _numerator)
        .set(GetDenominator, () => _denominator)
        .set(AddFraction, (fraction) => {
            const newDenom = This(Euclidean, denominator, fraction(GetDenominator));
            const newNum = numerator * newDenom / denominator 
                + fraction(GetNumerator) * newDenom / fraction(GetDenominator);
            return New(Fraction(newNum, newDenom));
        })
        .set(Equals, (obj) => This(TypeEquals, obj)
            && numerator == obj(GetNumerator)
            && denominator == obj(GetDenominator))
        .set(GetType, () => _type)
    const protected = new Map(public, base(GetProtectedMap)) // Подключаем к себе протектед методы base (не забываем оверрайдить)
        .set(Euclidean, (a, b) => {
            while (b != 0) {
                const c = a;
                a = b;
                b = c % b;
            }
            return a;
        })
    const private = protected;
    
    const [Public, Protected, This] = 
    [(method, ...args) => base(Getter, public, method, args), // Почему base вместо This? Иначе в рекурсию уходит... В следующем наследнике прокатит?
     (method, ...args) => base(Getter, protected, method, args),
     (method, ...args) => base(Getter, private, method, args)];

    return [Public, Protected];
}

// Аналог Object
function Obj() {
    // Объявление методов, полей
    const [GetType, TypeEquals, Equals, Getter, GetProtectedMap, GetPublicMap] = 
        ["GetType", "TypeEquals", "Equals", "Getter", "GetProtectedMap", "GetPublicMap"];
    const _type = "Object";
    // Синтаксический сахар
    const GetterMethod = (map, method, args) => {
        if (map.has(method))
            return map.get(method)(...args);
        throw new Error("Method " + method + " not found");
    }
    // Реализации методов
    const public = new Map()
        .set(GetType, () => _type)
        .set(TypeEquals, (obj) => This(GetType) == obj(GetType))
        .set(Equals, (obj) => This(TypeEquals, obj));
    const protected = public
        .set(Getter, GetterMethod)
        .set(GetProtectedMap, () => protected)
        .set(GetPublicMap, () => public);
    const private = protected;

    const [Public, Protected, This] = 
        [(method, ...args) => GetterMethod(public, method, args),
         (method, ...args) => GetterMethod(protected, method, args),
         (method, ...args) => GetterMethod(private, method, args)];

    return [Public, Protected];
}

function New(obj) { // Сокрытие protected части
    const [public, protected] = obj
    return public;
}

function Extend(obj) { // Передача обоих частей при наследовании
    const [public, protected] = obj
    return protected;
}