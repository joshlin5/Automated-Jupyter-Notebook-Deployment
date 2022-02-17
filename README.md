# P
[Provision Workshop Screencast](https://youtu.be/z_rbmrabvt8)

Commands for Mac m1:
# Build your custom docker image
`p init`

# Build rootfs, extract kernel, initrd and package as iso.
`p build`

Still need to change ubuntu password to "ubuntu":

# docker run with volume where rootfs is at and an interactive shell
`docker run -it -v/Users/Joshua/Desktop/DevOps/P2/HW2-jlin36-DevOps/lib/scripts:/scripts --privileged p:latest sh`

# Create rootfs directory (called rootfs1 on my machine), mount disk, and enter ubuntu from container
# My directory is called rootfs1 and my disk is called rootfs. Ubuntu user is called "ubuntu"
`mkdir -p rootfs1
mount -o offset=0 scripts/rootfs /rootfs1
chroot rootfs1 su - ubuntu`

# Change password of user "ubuntu" to "ubuntu" and exit ubuntu
`sudo passwd ubuntu`

# unmount rootfs and exit container
`umount rootfs1
exit`

# Create VM by running vftool directly
`~/Desktop/DevOps/P2/HW2-jlin36-DevOps/node_modules/virtcrud/providers/vf/vendor/vftool/build/vftool -k vmlinuz -i initrd -d rootfs -a "console=hvc0 root=/dev/vda"`

# Login to VM
Login as user "ubuntu" and password "ubuntu"

# Find the VM's ip address
Ip address is shown when logging in or run `ip a`

# Run Jupyter Notebook using the VM's ip address
`sudo jupyter notebook --allow-root --ip=VM_IPV4_ADDRESS`
