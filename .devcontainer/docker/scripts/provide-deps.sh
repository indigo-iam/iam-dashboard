# SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
#
# SPDX-License-Identifier: EUPL-1.2

#!/bin/bash

set -ex

apt-get update
apt-get upgrade -y

apt-get install -y \
  git \
  sudo \
  vim

apt-get clean
apt-get clean autoclean
apt-get autoremove --yes
rm -rf /var/lib/{apt,dpkg,cache,log}/
