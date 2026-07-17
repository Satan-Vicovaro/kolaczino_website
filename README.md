<div id="top">

<!-- HEADER STYLE: CLASSIC -->
<div align="center">

<!--<img src="readmeai/assets/logos/purple.svg" width="30%" style="position: relative; top: 0; right: 0;" alt="Project Logo"/> -->

# KOLACZINO WEBSITE

<em></em>

<!-- BADGES -->
<em>Built with the tools and technologies:</em>

<img src="https://img.shields.io/badge/JSON-000000.svg?style=default&logo=JSON&logoColor=white" alt="JSON">
<img src="https://img.shields.io/badge/npm-CB3837.svg?style=default&logo=npm&logoColor=white" alt="npm">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=default&logo=JavaScript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/React-61DAFB.svg?style=default&logo=React&logoColor=black" alt="React">
<br>
<img src="https://img.shields.io/badge/Docker-2496ED.svg?style=default&logo=Docker&logoColor=white" alt="Docker">
<img src="https://img.shields.io/badge/Prisma-2D3748.svg?style=default&logo=Prisma&logoColor=white" alt="Prisma">
<img src="https://img.shields.io/badge/CSS-663399.svg?style=default&logo=CSS&logoColor=white" alt="CSS">
<br>
</div>

---

## Overview
This is source code of my website which depicts beauty of my cat named Gruby, and shows my implementation of dynamic n-dimensional game of Tic-Tac-Toe. It is [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with Sqlite as a database. 

## Features
- Daily photo of my lovely Gruby with ability to leave a like
- Fully working n-dimensional Tic-Tac-Toe with option to:
    - change number of dimensions (obviously)
    - change size of dimensions
    - disable central element of this shape (its to Op form game play perspective)
---

## How to install

### For standalone application 
In order to build this application you need ability to run Next.js:
- Node.js v18.18

Package manager e.g.:
- npm

Build the website from the source and intsall dependencies:

1. **Clone the repository:**

    ```sh
    git clone https://github.com/Satan-Vicovaro/kolaczino_website.git
    ```

2. **Navigate to the project directory:**

    ```sh
    cd kolaczino_website.git
    ```

3. Create file .env with variable: INTERNAL_MESSAGE_ID="...", with some long random string inside.
4. Create folder in root directory **photos-private** and put inside images you want to show.
5. Change basicData variable in **prisma/seed.js**, following the convention shown there.
6. **Setup database using prisma:**
    ```sh
    npx prisma generate
    npx prisma migrate deploy && npx prisma db seed
     ```
7. Run:
   ```sh
    npm run dev
    ```
   And you should be good to go.

### Docker Installation
1. Enshure you have docker installed on your machine
2. **Clone the repository:**
    ```sh
    git clone https://github.com/Satan-Vicovaro/kolaczino_website.git
    ```
    
3. **Navigate to the project directory:**

    ```sh
    cd kolaczino_website.git
    ```

4. Create file .env with variable: **INTERNAL_MESSAGE_ID="..."**, with some long random string inside.
5. Create folder in root directory **photos-private** and put inside images you want to show.
6. Change basicData variable in **prisma/seed.js**, following the convention shown there.
7. **Run this command to build docker image**
     ```sh
     docker build -t nextjs-docker .
     ```
9. **Run docker image**
     ```sh
     docker run -p 3000:3000 nextjs-docker
     ```
     docker is running on port 3000.
   
