import { AppletRequest } from "@/core/http/applet";
import { cts } from '@/core/utils/createinterface';
const request = new AppletRequest('https://www.fastmock.site/mock/a18ab7dc672d1956641266f46a6e2f61/api');
export const getData = async () => {
    const res = await request.get({ url: "/api/rows" }) as any;
    cts(res.rows,'RequestType')
    return res.rows;
}
export const postLogin = async () => {
    const res = await request.put({ url: "/api/login" }) as any;
    cts(res.data,'LoginType')
    return res.data;
}