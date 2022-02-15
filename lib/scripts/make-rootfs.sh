#!/bin/bash

# Echo commands run
set -x

# exit when any command fails
set -e

echo "Running rootfs build script"
mkdir -p rootfs
dd if=/dev/zero of=disk.img seek=10240 bs=1M count=50
mkfs.ext4 disk.img
mkdir -p /rootfs/mnt/disk
mount -o offset=0 disk.img /rootfs/mnt/disk/
wget https://cloud-images.ubuntu.com/focal/current/focal-server-cloudimg-arm64-root.tar.xz
tar -xf focal-server-cloudimg-arm64-root.tar.xz -C /rootfs/mnt/disk/
chroot rootfs/mnt/disk rm /etc/resolv.conf
chroot rootfs/mnt/disk bash -c "echo 'nameserver 8.8.8.8' | tee /etc/resolv.conf"
chroot rootfs/mnt/disk apt update
chroot rootfs/mnt/disk apt-get update
chroot rootfs/mnt/disk apt-get install python3.6
chroot rootfs/mnt/disk apt install -y python3-pip
chroot rootfs/mnt/disk apt install python3-venv python3-pip
chroot rootfs/mnt/disk pip install notebook
wget https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv -P /rootfs/data
chroot rootfs/mnt/disk apt install linux-virtual -y
cp rootfs/mnt/disk/boot/initrd.img rootfs/mnt/disk/boot/vmlinuz scripts
umount rootfs/mnt/disk
cp disk.img scripts
