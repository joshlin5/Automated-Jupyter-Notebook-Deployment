# P
[Provision Workshop Screencast](https://youtu.be/z_rbmrabvt8)

[Privision Code](https://github.ncsu.edu/CSC-DevOps-S22/HW2-jlin36-DevOps/blob/master/Provision/index.js)

Commands for Mac m1:
1. Build your custom docker image
`p init`

2. Build rootfs, extract kernel, initrd and package as iso.
`p build`

3. docker run with volume where rootfs is at and an interactive shell
`docker run -it -v/Users/Joshua/Desktop/DevOps/P2/HW2-jlin36-DevOps/lib/scripts:/scripts --privileged p:latest sh`

4. Create rootfs directory (called rootfs1 on my machine), mount disk, and enter ubuntu from container
 (My directory is called rootfs1 and my disk is called rootfs. Ubuntu user is called "ubuntu")
`mkdir -p rootfs1
mount -o offset=0 scripts/rootfs /rootfs1
chroot rootfs1 su - ubuntu`

5. Change password of user "ubuntu" to "ubuntu" and exit ubuntu
`sudo passwd ubuntu`

6. unmount rootfs and exit container
`umount rootfs1
exit`

7. Create VM by running vftool directly
`~/Desktop/DevOps/P2/HW2-jlin36-DevOps/node_modules/virtcrud/providers/vf/vendor/vftool/build/vftool -k vmlinuz -i initrd -d rootfs -a "console=hvc0 root=/dev/vda"`

8. Login to VM
Login as user "ubuntu" and password "ubuntu"

9. Find the VM's ip address
Ip address is shown when logging in or run `ip a`

10. Run Jupyter Notebook using the VM's ip address
`sudo jupyter notebook --allow-root --ip=VM_IPV4_ADDRESS`
