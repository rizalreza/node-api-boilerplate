FROM node:16-alpine

RUN apk add git openssh tzdata build-base python3 net-tools
RUN mkdir -p /home/node/.ssh && \
    chmod 0700 /home/node/.ssh && \
    ssh-keyscan bitbucket.org > /home/node/.ssh/known_hosts

COPY id_rsa /home/node/.ssh/id_rsa

RUN chmod 600 /home/node/.ssh/id_rsa

ENV TZ="Asia/Jakarta"

RUN npm install -g sequelize-cli

RUN mkdir /home/node/app/ && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

RUN rm -rf node_modules package-lock.json

RUN chown node:node -R /home/node

USER node

RUN npm install && npm cache clean --force --loglevel=error

COPY --chown=node:node . .

CMD [ "node", "./bin/www", "4402"]
