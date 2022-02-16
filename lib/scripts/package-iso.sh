#!/bin/bash

# Echo commands run
set -x

# exit when any command fails
set -e
mkdir -p rootfs1
mount -o offset=0 scripts/rootfs /rootfs1
mkdir -p /iso/isolinux
mkdir -p /iso/boot
cp rootfs1/boot/initrd.img rootfs1/boot/vmlinuz /iso/boot
cp /syslinux/isolinux.bin /syslinux/isolinux.cfg /syslinux/ldlinux.c32 /iso/isolinux/
mkisofs -o jn.iso -b isolinux/isolinux.bin -c isolinux/boot.cat -no-emul-boot -boot-load-size 4 -boot-info-table -J iso
cp rootfs1/boot/initrd.img rootfs1/boot/vmlinuz scripts
mv scripts/initrd.img scripts/initrd
mv scripts/vmlinuz scripts/vmlinuz.gz; gzip -d scripts/vmlinuz.gz
umount rootfs1
cp jn.iso scripts
