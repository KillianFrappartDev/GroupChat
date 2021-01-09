<p align="center"><img src="https://i.ibb.co/yVBfQYb/gc-logo-nobg.png" alt="gc-logo-nobg" border="0" width="500px"></p>

<h2>Introduction</h2>
<p>GroupChat is an instant messaging webapp built from scratch for my personnal portfolio. This project is not intended to generate profit, but the source code is open source and anyone interested can fork the project and do whatever he wants with.</p>
<p>Have a look to the <a href="https://kf-groupchat.com" target="blank">live version</a> , this readme or its dedicated <a href="#">blog post</a> to learn more about the project structure and the technologies involved.</p> 
<p>In case you want to share problems or tips, please go ahead, it is very much appreciated! 😇</p>

<h2>Table of Contents</h2>

<ul>
  <li><a href="#setup">Setup</a></li>
  <li><a href="#codebase">Codebase Overview</a></li>
  <li><a href="#views">Views & Components</a></li>
</ul>

<h2 id="setup">Setup</h2>
<p>In order to run the project locally, you need node installed globally.</p>
<h3>Step 1</h3>
Clone the project and install dependencies in both frontend and backend directory.

```
git clone https://github.com/KillianFrappartDev/GroupChat.git
cd GroupChat/frontend && npm install
cd GroupChat/backend && npm install
```

<h3>Step 2</h3>
Create a mongoDB database, a Cloudinary account and insert environement variables.

```
# backend/.env

DB_URL=<URL HERE>
JWT_SECRET=<Any string you want>

# frontend/.env

REACT_APP_SERVER_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
REACT_APP_CLOUDINARY_API=<Your cloudinary api>
REACT_APP_CLOUDINARY_SECRET=<Your cloudinary secret>
```

<h3>Step 3</h3>
Start a dev server.

```
cd GroupChat/frontend && npm start
cd GroupChat/backend && npm start
```

<h2 id="codebase">Codebase Overview</h2>

<p align="center"><img src="https://i.ibb.co/ssPJXwp/Screenshot-2021-01-09-at-15-31-58.png" alt="gc-logo-nobg" border="0" width="100%"></p>
