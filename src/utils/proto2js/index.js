import protobuf from "protobufjs";

// 全局缓存
let protoRootPromise = null;

const getProtoRoot = async () => {
    if (!protoRootPromise) {
        // 注意 load 不需要数组，传字符串就行
        protoRootPromise = protobuf.load("/proto/core_field.proto");
    }
    return protoRootPromise;
};

const decodeProtoField = async (data, fieldId) => {
    const protoRoot = await getProtoRoot(); // 确保加载完成
    const protoField = protoRoot.lookupType(fieldId);

    // 1. Base64 解码成二进制字符串
    const binaryStr = atob(data);

    // 2. 转换成 Uint8Array（字节数组）
    const byteArray = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
        byteArray[i] = binaryStr.charCodeAt(i);
    }


    // // base64 -> buffer
    // const buffer = Buffer.from(data, "base64");

    // decode
    const message = protoField.decode(byteArray);

    // 转 JSON
    return protoField.toObject(message, {
        longs: String,
        enums: String,   // enum 用字符串表示
        defaults: true,  // 补全默认值
    });
};

export default {
    decodeProtoField
};
