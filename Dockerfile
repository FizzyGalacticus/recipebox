FROM node:9.2.0

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
RUN echo "deb http://repo.mongodb.org/apt/debian wheezy/mongodb-org/3.4 main" | tee /etc/apt/sources.list.d/mongodb-org-3.4.list
RUN dpkg-divert --local --rename --add /sbin/initctl
RUN ln -sf /bin/true /sbin/initctl

RUN apt-get update
RUN apt-get install -y mongodb-org
VOLUME ["/data/db"]
VOLUME ["/certs"]

RUN groupadd -r nodejs && useradd -m -r -g nodejs nodejs
RUN mkdir -p /home/nodejs/app
WORKDIR /home/nodejs/app

ENV NPM_CONFIG_LOGLEVEL warn

EXPOSE 5000 27017

COPY package.json package.json
RUN npm install

COPY . /home/nodejs/app

RUN chown -R nodejs:nodejs /home/nodejs/app
#USER nodejs
#RUN npm start &

#USER root
COPY bash_scripts/start.sh /start.sh
RUN chmod +x /start.sh
ENTRYPOINT /start.sh