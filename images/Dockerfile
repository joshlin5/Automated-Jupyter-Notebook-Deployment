FROM ubuntu:20.04
RUN apt-get -y update

# update packages and install
RUN apt-get install -y openjdk-11-jre-headless wget curl unzip

RUN apt-get -y install git maven mkisofs e2fsprogs xz-utils mount

ENV JAVA_HOME /usr/lib/jvm/java-11-openjdk-arm64
