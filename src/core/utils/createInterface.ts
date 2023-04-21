import CreateInterface from "data-to-ts";
export const cts = (source:any,name:string)=>{
    new CreateInterface(source,name).get((e:string)=>{
      uni.setClipboardData({
        data:e
      })
    });
    throw new Error(`请删除调用式 at ${__dirname}`)
  }