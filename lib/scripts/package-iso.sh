#!/bin/bash

# Echo commands run
set -x

# exit when any command fails
set -e
mkdir -p /iso/isolinux
mkdir -p /iso/boot
mv /syslinux/isolinux.bin /syslinux/isolinux.cfg /syslinux/ldlinux.c32 /iso/isolinux/
mkisofs -o jn.iso -b isolinux/isolinux.bin -c isolinux/boot.cat -no-emul-boot -boot-load-size 4 -boot-info-table -J iso
