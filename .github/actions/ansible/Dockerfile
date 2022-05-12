FROM alpine 

ENV ANSIBLE_HOST_KEY_CHECKING=False

RUN apk add ansible 
RUN apk add gcc 
RUN apk add libc-dev 
RUN apk add libffi-dev 
RUN apk add openssh-client sshpass
RUN apk add openssl-dev
RUN apk add python3 
RUN apk add python3-dev
RUN apk add py3-pip 

RUN pip3 install --upgrade paramiko
RUN pip3 install docker

COPY hosts /hosts
COPY ansible.cfg /etc/ansible/ansible.cfg
COPY entrypoint.sh /entrypoint.sh
CMD ["sh", "/entrypoint.sh"]