FROM ubuntu:20.04

# ** [Optional] Uncomment this section to install additional packages. **
#
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive \
    apt-get -y install node-typescript node-typescript-types build-essential npm git

RUN npm install --save-dev gitlab:foundry-projects/foundry-pc/foundry-pc-types

RUN git config --global user.name "Taylor E. Berger"
RUN git config --global user.email "taylor.e.berger@gmail.com"

RUN npm install -g sass