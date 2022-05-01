FROM node:16-alpine
WORKDIR /app
COPY . /app
EXPOSE 5001
RUN ["npm", "install"]
ENTRYPOINT ["npm", "run","devStart"]