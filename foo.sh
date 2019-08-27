#!/bin/bash
imageName=floco/samples
containerName=floco-samples

docker build -t $imageName -f Dockerfile  .

echo Delete old container...
docker rm -f $containerName

echo Run new container...
#docker run -t -d --name $containerName $imageName
docker run --name $containerName $imageName