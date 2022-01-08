// Obj's methods
export const [GetType, TypeEquals, Equals, Getter, GetProtectedMap, GetPublicMap] = 
["GetType", "TypeEquals", "Equals", "Getter", "GetProtectedMap", "GetPublicMap"];

// Object analog
export function Obj() {
    const _type = "Object";
    
    const GetterMethod = (map, method) => {
        if (map.has(method)) {
            return map.get(method);
        }
        throw new Error("Method " + method + " not found");
    }

    const publicMethods = new Map()
        .set(GetType, () => _type)
        .set(TypeEquals, (obj) => This(GetType)() == obj(GetType)())
        .set(Equals, (obj) => This(TypeEquals)(obj));
    const protectedMethods = publicMethods
        .set(Getter, GetterMethod)
        .set(GetProtectedMap, () => protectedMethods)
        .set(GetPublicMap, () => publicMethods);
    const privateMethods = protectedMethods;

    const [Public, Protected, This] = 
        [(method) => GetterMethod(publicMethods, method),
         (method) => GetterMethod(protectedMethods, method),
         (method) => GetterMethod(privateMethods, method)];

    return [Public, Protected];
}