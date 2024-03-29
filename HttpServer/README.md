# 使用方法
#### 1.下载python3
#### 2.在控制台中输入 python HttpServerWithThread.py


# 请求方法

#### 通过http 的 get 方法请求 (post 方法暂不支持)
#### eg: hostname/random?abc=def
所有请求返回的json相同:
```
{
    "result": 0,//-1:失败,0:成功
    "reason" : "",//失败原因
    "data":{}//返回的数据 失败时为空json串 成功时是json串
}
```

# API
- /random 会随机返回一个做好的json
- /index?index=1 会返回index为1的json 用于分享功能
- /uploadJson?json={"name":"Liby Wang"} 会将json字符串上传到服务器,返回值:
```
{
    "result":0,
    "reason":"",
    "data":
    {
        "index":1
    }
}
```