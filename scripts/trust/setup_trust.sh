# SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
#
# SPDX-License-Identifier: EUPL-1.2

#!/bin/bash

original_dir=$(pwd)
working_dir=$(dirname ${0})
install_dir="$(realpath ${1})"
helper_scripts_dir="/tmp/helper-scripts"
ca_name=star_test_example_ca
cert_name=star_test_example
user_cert_name=test0

if [[ -z ${install_dir} ]]; then
  echo "Usage: scripts/trust/setup_trust.sh <install_dir>"
  exit 1
fi

cd ${working_dir}
echo "Current working directory: '${working_dir}'"
echo "Install directory: '${install_dir}'"

git clone https://baltig.infn.it/mw-devel/helper-scripts/ ${helper_scripts_dir}
PATH="${helper_scripts_dir}/x509-scripts/scripts:$PATH"

export CA_NAME=${ca_name}

make_ca.sh
install_ca.sh "${CA_NAME}" "${install_dir}"
make_cert.sh ${cert_name}
make_cert.sh ${user_cert_name}

cp ${ca_name}/certs/*.pem ${install_dir}

# VOMS proxies
cd ${original_dir}
proxy_dir=${install_dir}/proxy.d
mkdir -p ${proxy_dir}
voms-proxy-fake -conf scripts/trust/proxy.d/0.conf -out ${proxy_dir}/0.pem


rm -rf scripts/trust/${CA_NAME}
rm -rf ${helper_scripts_dir}
