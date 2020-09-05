# Use the Alpine Linux box as this is more than enough.
FROM node:14-alpine

# Run as root
USER root

VOLUME /opt

# Set path to EddieBot
WORKDIR /opt/EddieBot/

RUN apk update
RUN apk upgrade

# Bash is probably a preferred shell over /bin/sh.
RUN apk add --no-cache bash

# Install OpenJDK for Firebase
RUN apk --no-cache add openjdk11

# Set Timezone
ARG TZ=GMT
ENV TZ ${TZ}

# Set timezone
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install API Dependencies.
RUN apk --no-cache add tzdata ca-certificates
RUN npm install -g typescript ts-node ts-node-dev firebase-tools

RUN firebase setup:emulators:firestore

RUN cd /opt/EddieBot/ && npm install

# Run emulator in BG (there must be a nicer way of doing this, without having to have a separate openjdk container).
CMD ["firebase emulators:start", "npm run dev"]