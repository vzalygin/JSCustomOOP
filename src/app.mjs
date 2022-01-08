import { New, Fraction, GetType, Equals, AddFraction , GetDenominator, GetNumerator } from "./fraction.mjs";

const fraction1 = New(Fraction(2, 3));
const fraction2 = New(Fraction(1, 3));
console.log(fraction1(GetType)());
console.log(fraction1(Equals)(fraction2));
const fraction3 = fraction1(AddFraction)(fraction2);
console.log(fraction3(GetNumerator)() + " " + fraction3(GetDenominator)());