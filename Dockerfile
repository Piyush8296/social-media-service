FROM mongo-express:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Installing packages
RUN npm install

# Bundle app source
COPY . .

EXPOSE 9000
CMD [ "npm", "start" ]