const isArray = (type: unknown): type is Array<any> => type instanceof Array;
type Obj<T = any> = { [key in string | number]: T };
const isObject = (type: unknown): type is Obj => typeof type === 'object';

const firstToUpper1 = (str:string)=> {
    return str.trim().toLowerCase().replace(str[0], str[0].toUpperCase());
}
export default class CreateInterface {
    private static _stack:string[] = [];
    private get target() {
        return CreateInterface._stack.join('\n');
    }
    constructor(source: any, name: string) {
        this._factory(source, name);
    }
    private _factory(source: any, name: string): void {
        isArray(source)&&(source=source[0]);
        if(isObject(source)){
            for (const key in source) {
                const interName = firstToUpper1(key);
                if( isArray(source[key])){
                    if(isObject(source[key][0])){
                        this._factory(source[key],interName + 'Type');
                        source[key] = interName + 'Type[]'
                    }else{
                        source[key] = (typeof source[key][0]) + '[]';
                    }
                }else if(isObject(source[key])){
                    this._factory(source[key],interName + 'Type');
                    source[key] = interName + 'Type'
                }else{
                    source[key] = typeof source[key];
                }
            }
        }else{
            CreateInterface._stack.unshift(`export type ${name} ${(typeof source)+'[]'};`);
            return;
        }
        CreateInterface._stack.unshift(`export interface ${name} ${(JSON.stringify(source)).replaceAll('"', '')};`);
    }
    get(fn:Function): void {
        fn(this.target);
    }
}