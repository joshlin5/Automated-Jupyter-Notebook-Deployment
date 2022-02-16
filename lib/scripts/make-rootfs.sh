#!/bin/bash

# Echo commands run
set -x

# exit when any command fails
set -e

echo "Running rootfs build script"
mkdir -p rootfs1
dd if=/dev/zero of=rootfs seek=10240 bs=1M count=50
mkfs.ext4 disk.img
#mkdir -p /rootfs1/proc
mount -o offset=0 disk.img /rootfs1
#mount --bind /proc /rootfs/proc
wget https://cloud-images.ubuntu.com/focal/current/focal-server-cloudimg-arm64-root.tar.xz
tar -xf focal-server-cloudimg-arm64-root.tar.xz -C /rootfs1
chroot rootfs1 rm /etc/resolv.conf
chroot rootfs1 bash -c "echo 'nameserver 8.8.8.8' | tee /etc/resolv.conf"
chroot rootfs1 apt update
chroot rootfs1 apt-get update
chroot rootfs1 apt-get install python3.6
chroot rootfs1 apt install -y python3-pip
chroot rootfs1 apt install python3-venv python3-pip
chroot rootfs1 pip install notebook
wget https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv -P /rootfs1/data
FK_MACHINE=none chroot rootfs1 apt install linux-virtual -y
#unmount rootfs/proc
umount rootfs1
#cp rootfs1/boot/initrd.img rootfs/boot/vmlinuz scripts
cp rootfs scripts
