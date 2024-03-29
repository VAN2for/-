from http.server import HTTPServer, BaseHTTPRequestHandler
from socketserver import ThreadingMixIn
import time
from urllib import parse
import json
import random
import re


_PATH_ = r"e:/OneDrive/Gitee/resume-generator/HttpServer/"

def log(programName,content):
    print("[{}] {}".format(programName,content))

class Handler(BaseHTTPRequestHandler):

    def do_GET(self):

        #分析请求数据
        parsed_path = parse.urlparse(self.path)

        responseCode = None
        message = None
        isJson = True
        fileName = ''
        #构造响应数据
        if(parsed_path.path == '/'):
            responseCode = 404
            message = r'{"result":-1,"reason":"What do you want","data":{}}'

        elif(parsed_path.path == '/random'):
            responseCode = 200
            message = json.dumps(jsonDatas['datas'][random.randint(0,len(jsonDatas['datas'])-1)])
            message = r'{"result":0,"reason":"","data":' + message + r'}'

        elif(parsed_path.path == '/index'):
            try:
                query = parse.parse_qs(parsed_path.query)
                message = json.dumps(jsonDatas['datas'][int(query['index'][0])])
                message = r'{"result":0,"reason":"","data":' + message + r'}'
                responseCode = 200
            except Exception as e:#永远不要相信用户都是善良的
                responseCode = 404
                message = r'{"result":-1,"reason":"' + repr(e) + r'","data":{}}'
        
        elif(parsed_path.path == '/getImage'):
            try:
                isJson = False
                query = parse.parse_qs(parsed_path.query)
                fileName = query['fileName'][0]
                f = open(fileName,'rb')
                responseCode = 200
                self.send_response(200)
                self.send_header('Content-type', 'image/jpg')
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()

                self.wfile.write(f.read())
                f.close()
            except Exception as e:
                self.send_response(404)
                self.send_header('Content-type', 'application/json')
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()

                self.wfile.write((r'{"result":-1,"reason":"' + repr(e) + r'","data":{}}').encode("utf-8"))

            
             


        #TODO 加入其他应当处理的请求
        #TODO 同时可以加入https的支持（选）

        elif(parsed_path.path == '/uploadJson'):
            try:
                query = parse.parse_qs(parsed_path.query)
                uploadJson = json.loads(query["json"][0])
                indexOfAddition = len(jsonDatas["datas"])
                jsonDatas["datas"].append(uploadJson)
                responseCode = 201
                message = r'{"result":0,"reason":"","data":{"index":' + str(indexOfAddition) + r'}}'
                log("uploadJson",query["json"][0])
            except Exception as e:#永远不要相信用户都是善良的
                responseCode = 400
                message = r'{"result":-1,"reason":"' + repr(e) + r'","data":{}}'



        if(not message):
            message = r'{"result":-1,"reason":"Not implemented","data":{}}'
        if(not responseCode):
            responseCode = 501

        #回应客户端
        
        if(isJson):
            self.send_response(responseCode)
            self.send_header('Content-Type','application/json; charset=utf-8')
            self.send_header("Access-Control-Allow-Origin", "*")#防止CORS安全错误 即浏览器安全的同源策略
            self.end_headers()
            self.wfile.write(message.encode('utf-8'))
            self.wfile.write(b'\n')
        else:
            pass

        #log一下
        print("result:" + (message if isJson else "getImage"))

    
    def do_POST(self):         # 处理post请求
        length = int(self.headers['content-length'])
        req_data = self.rfile.read(length)    # 读取所有http请求报文
        #print(self.headers)        # 请求头信息
        #print(self.command)      # 请求方式
        # 使用re解析出http请求中的图片,图片为字节类型
        # 图片数据需要去除httpserver加进去的form-data的边界线和文件的描述信息
        pattern1 = re.compile(b"-+\w*\s{2}(.*?\s{2}){2}\s{2}")
        pattern2 = re.compile(b"\s{2}-+.+\s{2}")
        res1 = re.match(pattern1, req_data)
        res2 = re.search(pattern2, req_data)
        file_data = req_data[res1.end():res2.start()]  

        # 将解析出的文件字节, 保存到本地
        fileName = str(time.time()) + ".jpg"
        with open(fileName, "wb") as w:
            w.write(file_data)       

        data = {
                'result': '0',
                'reason': '',
                'data': {'fileName': fileName}
        }
        # 返回响应报文

        self.send_response(200)   # 响应行
        self.send_header('Content-type', 'application/json') # 响应头
        self.end_headers()  # 空行
        self.wfile.write(json.dumps(data).encode('utf-8'))   # 响应体      
    
    

class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    """在一个新的线程中处理请求。"""

if __name__ == '__main__':
    #json
    global jsonDatas
    
    try:
        with open(_PATH_ + "Module.json",encoding = "utf-8") as f:
            l = f.readlines()
            jsonDatas = json.loads(l[0])
            print("[Json][Loaded Json]:" + l[0])
    except Exception as e:
        print(e)
        print("[Json]json load failed")

    #http server
    try:
        server = ThreadedHTTPServer(('localhost', 8080), Handler)
        print('[HttpServer]Starting server, use <Ctrl-C> to stop')
        server.serve_forever()
    except(KeyboardInterrupt):
        pass
    finally:
        jsonDatas["length"] = len(jsonDatas["datas"])
        jsonStr = json.dumps(jsonDatas)
        log("JsonDataSave",jsonStr)
        with open(_PATH_ + "Module.json",'w',encoding = "utf-8") as f:
            f.write(jsonStr)
