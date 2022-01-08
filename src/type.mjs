// Module for creating new types

export function New(obj) { // Сокрытие protected части
    const [publicMethods, protectedMethods] = obj
    return publicMethods;
}

export function Extend(obj) { // Передача обоих частей при наследовании
    const [publicMethods, protectedMethods] = obj
    return protectedMethods;
}