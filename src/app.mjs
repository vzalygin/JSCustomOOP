import * as fraction from "./fraction.mjs";
import { New } from "./type.mjs"; 

const fraction1 = New(fraction.Fraction(2, 3));
const fraction2 = New(fraction.Fraction(1, 3));
console.log(fraction1(fraction.GetType)());
console.log(fraction1(fraction.Equals)(fraction2));
const fraction3 = fraction1(fraction.AddFraction)(fraction2);
console.log(fraction3(fraction.GetNumerator)() + " " + fraction3(fraction.GetDenominator)());