import requests
url = "http://127.0.0.1:8080"
files = {'img':('1.jpg',open('1.jpg','rb'),'image/jpeg')}
res = requests.request("POST",url, data=None, files=files)
print(res.text)