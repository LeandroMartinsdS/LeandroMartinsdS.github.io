FROM ubuntu:24.04

# Create a non-root user (recommended for dev containers)
ARG USERNAME=dev
ARG USER_UID=1000
ARG USER_GID=1000

# Create non-root user
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME

# Make user sudo
ARG INSTALL_SUDO=true

RUN if [ "$INSTALL_SUDO" = "true" ]; then \
    apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y sudo && \
    echo "$USERNAME ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers && \
    rm -rf /var/lib/apt/lists/*; \
    fi

# Development tools
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
    bash \
    git \
    nodejs npm \
    && rm -rf /var/lib/apt/lists/*

# Default working directory (VS Code will override if needed)
WORKDIR /home/$USERNAME

USER $USERNAME
