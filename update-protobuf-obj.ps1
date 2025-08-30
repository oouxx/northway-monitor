# 假设本地环境已经配置好protoc
$SRC_DIR="D:\workspace\northstar\northstar-api\src\main\resources\proto"
$JAVA_DIR="D:\workspace\northstar\northstar-api\src\main\java"
$JS_DIR="D:\workspace\northstar-monitor\src\lib1"
protoc --plugin=protoc-gen-js=D:\protoc-32.0\bin\protoc-gen-js.exe --proto_path=$SRC_DIR --java_out=$JAVA_DIR --js_out=import_style=es6,binary:$JS_DIR $SRC_DIR/xyz/redtorch/pb/core_field.proto
protoc --plugin=protoc-gen-js=D:\protoc-32.0\bin\protoc-gen-js.exe --proto_path=$SRC_DIR --java_out=$JAVA_DIR --js_out=import_style=es6,binary:$JS_DIR $SRC_DIR/xyz/redtorch/pb/core_enum.proto
