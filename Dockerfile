FROM node:8-alpine

WORKDIR /workbench

RUN apk add git

COPY . react-floco

RUN cp -r react-floco/examples . \
    && rm -rf react-floco/examples

RUN cd react-floco \
    && npm install \
    && npm run build

RUN cd examples/js-example \
    && npm install

RUN mkdir -p examples/js-example/node_modules/react-floco/ \
    && cp -a react-floco/. examples/js-example/node_modules/react-floco/

RUN cd examples/js-example \
    && ls node_modules/react-floco \
    && npm run build

# RUN cp -a react-floco/. examples/js-example/node_modules/react-floco \
#     && ls examples/js-example/node_modules/react-floco/dist \
#     && cd examples/js-example \
#     && npm run build

#RUN cd examples/js-example \
#    && npm run build

ENTRYPOINT [ "npm","-v"]