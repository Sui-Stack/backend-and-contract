# # Step 1: Use an official Node.js runtime as a parent image
FROM node:18

# # Step 2: Set the working directory in the container
WORKDIR /usr/src/app

# # Step 3: Copy the package.json and package-lock.json files
COPY package*.json ./

# # Step 4: Install the dependencies
RUN npm install

# Install Sui CLI

FROM rust:1.82.0


RUN curl -L -o sui-devnet-v1.37.0-ubuntu-x86_64.tgz https://github.com/MystenLabs/sui/releases/download/devnet-v1.37.0/sui-devnet-v1.37.0-ubuntu-x86_64.tgz

# RUN tar -xzvf sui-devnet-v1.37.0-ubuntu-x86_64.tgz && \
#     rm sui-devnet-v1.37.0-ubuntu-x86_64.tgz && \
#     mv sui /usr/local/bin/sui && \
#     chmod +x /usr/local/bin/sui

#     # Step 6: Initialize Sui configuration non-interactively
#     # Here, the -y flag automatically confirms any prompts.
#     RUN mkdir -p /root/.sui/sui_config && \
#     echo "y" | sui client active-address || true
    
RUN sui genesis

RUN sui client switch --env devnet

RUN ls -a
RUN sui --version
# RUN rustup update stable


# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Compile TypeScript files
RUN npx tsc

# Step 7: Expose the port the app runs on
EXPOSE 3004

# Step 8: Define the command to run the app
CMD ["npm", "run", "prod"]