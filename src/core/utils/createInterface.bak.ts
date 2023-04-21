const isArray = (type: unknown): type is Array<any> => type instanceof Array;
type Obj<T = any> = { [key in string | number]: T };
const isObject = (type: unknown): type is Obj => typeof type === 'object';

const firstToUpper1 = (str:string)=> {
    return str.trim().toLowerCase().replace(str[0], str[0].toUpperCase());
}
class CreateInterface {
    private static _stack:string[] = [];
    private get target() {
        return CreateInterface._stack.join('\n');
    }
    constructor(source: any, name: string) {
        this._factory(source, name);
    }
    private _createInterface(source: any, name: string){
        CreateInterface._stack.unshift(`export interface ${name} ${(JSON.stringify(source)).replaceAll('"', '')};`);
    }
    private _createType(source: any, name: string){
        CreateInterface._stack.unshift(`export type ${name} = ${(typeof source)};`);
    }
    private _factory(source: any, name: string): void {
        if(isArray(source)){
            const obj = Object.create(null);
            for(const value of source){
                const interName = typeof value == 'number' || typeof value == 'string'? firstToUpper1(value.toString()):`Data$${source.indexOf(value)}`;
                if(obj[value]){continue}else{
                    if(isArray(source[value])){
                        obj[interName] = interName + 'Type[]'
                        this._factory(value,interName + 'Type[]');
                    }else if(isObject(value)){
                        obj[interName] = interName + 'Type'
                        this._factory(value,interName + 'Type');
                    }else{
                        obj[value] = typeof obj[value];
                    }
                };
            }
            console.log('obj==> :',obj);
            if(Object.keys(obj).length == 1){
                // this._createType(,name)
            }else{
                this._createInterface(obj,name);
            }
        }
        else if(isObject(source)){
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
            this._createInterface(source,name);
        }else{
            this._createType(source,name);
        }
    }
    get(fn:(e:string)=>void): void {
        fn(this.target);
    }
}
const c = [1,1]
// const c = [{a:'c',d:'b'},{a:'c',c:"c"}]
// const c = [1,'1',{ad:'ad',bg:['1',['c',true,undefined,{c:false}],{f:'a'}],o:[{a:'c',d:'b'},{a:'c',c:"c"}]}]
new CreateInterface(c,'TestType').get((e:string)=>{
    console.log('e==> :',e);
});