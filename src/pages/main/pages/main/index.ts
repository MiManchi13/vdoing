import { AppletRequest } from "@/core/http/applet";
import CreateInterface from 'data-to-ts';
const request = new AppletRequest('https://www.fastmock.site/mock/a18ab7dc672d1956641266f46a6e2f61/api');
export const getData = async () => {
    const res = await request.get({ url: "/api/rows" }) as any;
    // new CreateInterface(res.rows, 'RequestType').get((e: string) => {
    //     uni.setClipboardData({
    //         data: e
    //     })
    // });
    return res.rows;
}
export const postLogin = async () => {
    const res = await request.put({ url: "/api/login" }) as any;
    // new CreateInterface(res.data, 'LoginType').get((e: string) => {
    //     uni.setClipboardData({
    //         data: e
    //     })
    // });
    return res.data;
}