# P
[Provision Workshop Screencast](https://youtu.be/z_rbmrabvt8)

Commands for Mac m1:
1. Build your custom docker image
`p init`

# Build rootfs, extract kernel, initrd and package as iso.
`p build`

Still need to change ubuntu password to "ubuntu":

2. docker run with volume where rootfs is at and an interactive shell
`docker run -it -v/Users/Joshua/Desktop/DevOps/P2/HW2-jlin36-DevOps/lib/scripts:/scripts --privileged p:latest sh`

3. Create rootfs directory (called rootfs1 on my machine), mount disk, and enter ubuntu from container
 (My directory is called rootfs1 and my disk is called rootfs. Ubuntu user is called "ubuntu")
`mkdir -p rootfs1
mount -o offset=0 scripts/rootfs /rootfs1
chroot rootfs1 su - ubuntu`

4. Change password of user "ubuntu" to "ubuntu" and exit ubuntu
`sudo passwd ubuntu`

5. unmount rootfs and exit container
`umount rootfs1
exit`

6. Create VM by running vftool directly
`~/Desktop/DevOps/P2/HW2-jlin36-DevOps/node_modules/virtcrud/providers/vf/vendor/vftool/build/vftool -k vmlinuz -i initrd -d rootfs -a "console=hvc0 root=/dev/vda"`

7. Login to VM
Login as user "ubuntu" and password "ubuntu"

8. Find the VM's ip address
Ip address is shown when logging in or run `ip a`

9. Run Jupyter Notebook using the VM's ip address
`sudo jupyter notebook --allow-root --ip=VM_IPV4_ADDRESS`
