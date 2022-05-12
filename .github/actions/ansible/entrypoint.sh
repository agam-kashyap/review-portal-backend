#!/bin/sh
echo -e "[azure]\n$AZUREVM_IP_ADDRESS\n\n$(cat /hosts)" > /hosts
echo "ansible_ssh_pass=$SSH_PASS" >> /hosts
echo "ansible_become_pass=$SSH_PASS" >> /hosts
echo "Performing Ansible commands"
ansible-playbook ansible/playbook.yml --user reviewportal
