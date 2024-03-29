# Comment
FROM node:14-alpine AS node
WORKDIR /
COPY . .
RUN \
	npm install && \
	npm run build
CMD ["node", "main.js"]

ONBUILD RUN echo
ADD . .
ARG NODE_ENV
ENTRYPOINT ["node", "main.js"]
ENV NODE_ENV=$NODE_ENV
EXPOSE 3000
HEALTHCHECK --interval=30s
LABEL key=value
MAINTAINER John Doe
SHELL ["/bin/sh", "-c"]
STOPSIGNAL SIGTERM
USER node
VOLUME /var
