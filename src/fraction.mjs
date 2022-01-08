import { New, Extend } from "./type.mjs";
import { Obj } from "./obj.mjs";

export const [GetNumerator, GetDenominator, AddFraction, Equals, Getter, GetType, Euclidean, TypeEquals, GetPublicMap, GetProtectedMap] =
        ["GetNumerator", "GetDenominator", "AddFraction", "Equals", "Getter", "GetType", "Euclidean", "TypeEquals", "GetPublicMap", "GetProtectedMap"];

export function Fraction(numerator, denominator) { 
    const base = Extend(Obj()); // Применяем наследование от Obj

    const _numerator = numerator;
    const _denominator = denominator;
    const _type = "Fraction";

    const publicMethods = base(GetPublicMap)() // Забираем к себе публичные методы base
        .set(GetNumerator, () => _numerator)
        .set(GetDenominator, () => _denominator)
        .set(AddFraction, (fraction) => {
            const newDenom = This(Euclidean)(denominator, fraction(GetDenominator)());
            const newNum = numerator * newDenom / denominator 
                + fraction(GetNumerator)() * newDenom / fraction(GetDenominator)();
            return New(Fraction(newNum, newDenom));
        })
        .set(Equals, (obj) => This(TypeEquals)(obj)
            && numerator == obj(GetNumerator)()
            && denominator == obj(GetDenominator)())
        .set(GetType, () => _type)
    const protectedMethods = new Map(publicMethods, base(GetProtectedMap)()) // Подключаем к себе протектед методы base (не забываем оверрайдить)
        .set(Euclidean, (a, b) => {
            while (b != 0) {
                const c = a;
                a = b;
                b = c % b;
            }
            return a;
        })
    const privateMethods = protectedMethods;
    
    const [Public, Protected, This] = 
    [(method) => base(Getter)(publicMethods, method), // Почему base вместо This? Иначе в рекурсию уходит... В следующем наследнике прокатит?
     (method) => base(Getter)(protectedMethods, method),
     (method) => base(Getter)(privateMethods, method)];

    return [Public, Protected];
}

export { New, Extend };