FROM node:8

# Install global packages
RUN npm install -g http-server \
    && npm install -g typescript

COPY . /react-floco

# Build react-floco
WORKDIR /react-floco
RUN npm install
RUN cat ./tsconfig.docker.json
RUN tsc --project tsconfig.docker.json

COPY examples /examples

# Build js-example
WORKDIR /examples/js-example
RUN npm install
RUN mkdir -p node_modules/react-floco/
RUN cp -a ../../react-floco/.  node_modules/react-floco/
RUN npm run build

# Build ts-example
WORKDIR /examples/ts-example
RUN npm install
RUN mkdir -p node_modules/react-floco/
RUN cp -a ../../react-floco/.  node_modules/react-floco/
RUN npm run build

WORKDIR /examples
ENTRYPOINT [ "http-server", "-p", "8080" ]