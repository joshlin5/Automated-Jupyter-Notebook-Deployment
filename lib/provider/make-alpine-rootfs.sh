#!/usr/bin/env bash

# exit on failure
set -e

# Prepare temporary folder and set working directory
mkdir -p ../images/mount-tmp
cd ../images

# Create raw disk
echo "Creating disk sized $1M"
dd if=/dev/zero of=rootfs.img bs=1m count=$1
mkfs.vfat rootfs.img -n V-ROOTFS

# Mount raw disk onto mount-tmp
OUTPUT=$(hdiutil attach -imagekey diskimage-class=CRawDiskImage rootfs.img -mountpoint mount-tmp)
echo $OUTPUT
read DISK MOUNT <<< $( echo "$OUTPUT")

# Copy extracted rootfs into mounted image
echo "Copying rootfs"
tar -xf alpine-minirootfs-3.15.0-aarch64.tar.gz -C mount-tmp

# Cleanup
hdiutil detach $DISK
