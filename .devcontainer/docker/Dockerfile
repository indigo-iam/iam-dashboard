# SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
#
# SPDX-License-Identifier: EUPL-1.2

FROM node:lts

ARG USERNAME="indigoiam"
ARG USER_UID=1001
ARG USER_GID=${USER_UID}

COPY scripts/*.sh /tmp/scripts/

RUN chmod +x /tmp/scripts/*.sh && \
  /tmp/scripts/provide-deps.sh && \
  /tmp/scripts/provide-user.sh ${USERNAME} ${USER_UID} ${USER_GID} && \
  rm -rf /tmp/scripts

USER ${USERNAME}
WORKDIR /workspace

CMD ["sleep", "infinity"]

