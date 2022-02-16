#!/bin/bash

# Echo commands run
set -x

# exit when any command fails
set -e

echo "Running rootfs build script"
mkdir -p rootfs1
dd if=/dev/zero of=rootfs seek=10240 bs=1M count=50
mkfs.ext4 -L cloudimg-rootfs rootfs
mount -o offset=0 rootfs /rootfs1
wget https://cloud-images.ubuntu.com/focal/current/focal-server-cloudimg-arm64-root.tar.xz
tar -xf focal-server-cloudimg-arm64-root.tar.xz -C /rootfs1
chroot rootfs1 rm /etc/resolv.conf
chroot rootfs1 bash -c "echo 'nameserver 8.8.8.8' | tee /etc/resolv.conf"
chroot rootfs1 apt update
chroot rootfs1 apt-get update
chroot rootfs1 apt-get install python3
chroot rootfs1 apt-get install -y python3-pip
chroot rootfs1 apt-get install python3-notebook -y
#chroot rootfs1 pip3 install notebook
chroot rootfs1 pip3 install --no-input --exists-action=i pandas
chroot rootfs1 pip3 install --no-input --exists-action=i seaborn
chroot rootfs1 bash -c "groupadd -r ubuntu && useradd -m -r -g ubuntu ubuntu -s /bin/bash"
chroot rootfs1 bash -c "echo 'ubuntu ALL=(ALL) NOPASSWD: ALL' >> /etc/sudoers"
chroot rootfs1 bash -c "echo 'ubuntu:ubuntu' | chpasswd"
wget https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv -P /rootfs1/data
FK_MACHINE=none chroot rootfs1 apt install linux-virtual -y
umount rootfs1
cp rootfs scripts
