FROM node:10

# https://gist.github.com/jobwat/e15e2dc740792ef51723096cad38ed3c
RUN apt-get update && apt-get -y install cron

ADD . /app/node

WORKDIR /app/node

RUN yarn install --production=false

ADD crontab /etc/cron.d/stats-cron
RUN chmod +x /etc/cron.d/stats-cron
RUN crontab /etc/cron.d/stats-cron

CMD cron && tail -f /dev/null