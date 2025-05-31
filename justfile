@_default:
    just --list

build-image version:
    docker build . -t artale-price-query:{{version}}