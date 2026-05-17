FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn config set network-timeout 600000 -g
RUN yarn install

COPY . .

RUN yarn build

COPY scripts/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000

CMD ["/entrypoint.sh"]