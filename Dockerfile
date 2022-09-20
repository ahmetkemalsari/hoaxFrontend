FROM node:16.17.0-slim AS build-env

LABEL maintainer="aksari@netas.com.tr"

COPY ./package.json /usr/src/react-app/

WORKDIR /usr/src/react-app/

RUN npm install

COPY ./ /usr/src/react-app/

RUN npm run build

FROM nginxinc/nginx-unprivileged:1.21 AS runtime-env

EXPOSE 3000

COPY default.conf /etc/nginx/conf.d/default.conf

COPY --from=build-env /usr/src/react-app/build /usr/share/nginx/html/