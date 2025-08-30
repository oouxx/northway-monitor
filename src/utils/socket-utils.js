export default (() => {
    const base64ToJson = (base64Str) => {
        // 1. Base64 解码成二进制字符串
        const binaryStr = atob(base64Str);

        // 2. 转换成 Uint8Array（字节数组）
        const byteArray = new Uint8Array(binaryStr.length);
        for (let i = 0; i < binaryStr.length; i++) {
            byteArray[i] = binaryStr.charCodeAt(i);
        }

        // 3. 把字节数组转成 UTF-8 字符串
        const decoder = new TextDecoder("utf-8");
        const jsonStr = decoder.decode(byteArray);

        // 4. 解析成 JSON
        return JSON.parse(jsonStr);
    }
    return { base64ToJson }
})()