/**
 * keyof
 * keyof 获得的是对象的键
 */
const person1 = {
    name: "张三",
    age: 13,
    gender: 'male'
}
const person2 = {
    name: "李四",
    age: 34,
    gender: 'female'
}
const get = <T extends Object, K extends keyof T>(obj: T & Object, name: K): T[K] => {
    return obj[name]
}
get(person1, 'age')
interface User {
    id: number;
    age: number;
    name: string;
};

// 相当于: type PartialUser = { id?: number; age?: number; name?: string; }
type PartialUser = Partial<User>

// 相当于: type PickUser = { id: number; age: number; }
type PickUser = Pick<User, "id" | "age">

// 相当于: type Required = { id: number; age:number; name:string }
type RequiredUser = Required<User>

// 相当于: type OmitUser = { age:number; name:string }
type OmitUser = Omit<User, "id">

type UnionToIntersection<U> =
    (U extends U ? (x: U) => unknown : never) extends (x: infer R) => unknown
    ? R
    : never;
// type Res = UnionToIntersection<((name: 'aaa') => 'aaa') | ((name: 'bbb') => 'bbb') | ((name: 'ccc') => 'ccc')>
type Obj<T = any> = { [key in string | number]: T }

type Callback<T extends Obj> = (item: T extends (infer U)[] ? U : T[Extract<keyof T, string>], index: number, source?: T) => any

type AsyncCallback<T extends Obj> = (item: T extends (infer U)[] ? U : T[Extract<keyof T, string>], index: number, source?: T) => Promise<any>

const isArray = (type: unknown): type is Array<any> => type instanceof Array

const isObject = (type: unknown): type is Obj => typeof type === 'object'

/**
 * 同步遍历当前元素
 * @param source 需要遍历的元素
 * @param fn 遍历的同步回调 返回 true 可以停止遍历
 */
export const each = <T extends Obj> (source: T, fn: Callback<T>): void => {
    if (isArray(source)) {
        for (let i = 0, length = source.length; i < length; i++) {
            if (fn(source[i], i, source) === true) return
        }
    } else if (isObject(source)) {
        const keys = Reflect.ownKeys(source) as Array<keyof T>
        for (let i = 0, length = keys.length; i < length; i++) {
            const key = keys[i]
            if (Reflect.has(source, key) && key !== 'constructor') {
                if (fn(source[key], i, source) === true) return
            }
        }
    } else {
        fn(source, -1)
    }
}

/**
 * 倒序遍历
 * @param source 需要遍历的元素
 * @param fn 遍历的同步回调 返回 true 可以停止遍历
 */
export const reverseEach = <T extends Obj> (source: T, fn: Callback<T>): void => {
    if (isArray(source)) {
        for (let i = source.length - 1; i >= 0; i--) {
            if (fn(source[i], i, source) === true) return
        }
    } else if (isObject(source)) {
        const keys = Reflect.ownKeys(source) as Array<keyof T>
        for (let i = keys.length - 1; i >= 0; i--) {
            const key = keys[i]
            if (Reflect.has(source, key) && key !== 'constructor') {
                if (fn(source[key], i, source) === true) return
            }
        }
    } else {
        fn(source, -1)
    }
}

/**
 * 异步遍历当前元素
 * @param source 需要遍历的元素
 * @param fn 遍历的异步回调 返回 true 可以停止遍历
 */
export const asyncEach = async <T extends Obj> (source: T, fn: AsyncCallback<T>): Promise<void> => {
    if (isArray(source)) {
        for (let i = 0; i < source.length; i++) {
            const result = await fn(source[i], i, source)
            if (result === true) return
        }
    } else if (isObject(source)) {
        const keys = Reflect.ownKeys(source) as Array<keyof T>
        for (let i = 0, length = keys.length; i < length; i++) {
            const key = keys[i]
            if (Reflect.has(source, key) && key !== 'constructor') {
                const result = await fn(source[key], i, source)
                if (result === true) return
            }
        }
    } else {
        await fn(source, -1)
    }
}

const arr = [
    {
        name: "李四",
        age: 18,
        gender: "male"
    },
    {
        name: "张三",
        age: 22,
        gender: "female"
    },
    {
        name: "王五",
        age: 26,
        gender: "male"
    },
    {
        name: "赵六",
        age: 16,
        gender: "male"
    },
];
type Keys<T> = keyof (T extends (infer U)[] ? U : T[Extract<keyof T, string>]);
const arrange = <T extends Array<any>,K extends Keys<T>>(arr:T,propName:K) =>{
    const result = {};
    for(const item of arr){
        const key = item[propName];
        if(!result[key]){
            result[key] = [];
        }
        result[key].push(item);
    }
    return result;
}
arrange(arr,'age');