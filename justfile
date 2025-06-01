DOCKER_REGISTRY := "bg308222/artale-helper"

@_default:
    just --list

build-image version:
    docker build . -t {{DOCKER_REGISTRY}}:{{version}} -t {{DOCKER_REGISTRY}}:latest

push-image version:
    just build-image {{version}}
    docker push {{DOCKER_REGISTRY}}:{{version}}
    docker push {{DOCKER_REGISTRY}}:latest