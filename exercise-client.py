"""
发送请求，得到结果
"""

from  socket import  *
from multiprocessing import Process
import sys

ADDR = ("127.0.0.1",8000)

#请求进入聊天室
def login(sock):
    while True:
        name  = input('name:')
        msg = "L " +name #根据通信协议整理发送消息
        sock.sendto(msg.encode(),ADDR)#发送请求
        result,addr = sock.recvfrom(128)#等待回复
        if result.decode() == 'ok':
            print('您已经进入聊天室')
            return name
        else:
            print("您的名字太受欢迎了,换一个吧")

#收消息
def recv_msg(sock):
    while True:
        data,addr = sock.recvfrom(2048)
        print("\n"+data.decode()+"\n我:",end="")

#发消息
def send_msg(sock,name):
    while True:
        try:
            msg = input('我:')
        except KeyboardInterrupt:
            data = "E " + name
            sock.sendto(data.encode(), ADDR)
            sys.exit("您已退出聊天室")
        if msg == "exit":
            data = 'E ' + name
            sock.sendto(data.encode(),ADDR)
            sys.exit("您已退出聊天室")
        data = 'C %s %s' %(name,msg)
        sock.sendto(data.encode(),ADDR)

def main():
    sock = socket(AF_INET,SOCK_DGRAM)
    # sock.bind(('0.0.0.0',54555))
    name = login(sock)

    #为聊天创建子进程
    p = Process(target=recv_msg,args=(sock,))
    p.daemon = True #父进程退出子进程也退出
    p.start()
    send_msg(sock,name)



if __name__ == '__main__':
    main()
