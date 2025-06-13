<h1>📒 iNotebook</h1>

<p><strong>iNotebook</strong> is a full-stack secure note-taking web application that allows users to <strong>create</strong>, <strong>update</strong>, <strong>delete</strong>, and <strong>manage notes</strong>, with advanced authentication features like <strong>OTP verification</strong>, <strong>CAPTCHA</strong>, and secure JWT-based sessions.</p>

<hr/>
<h2> Live Demo</h2> <p>https://note-app-opal-beta.vercel.app/</p>
<h2>🔐 Features</h2>
<ul>
  <li> User Signup with Email OTP Verification</li>
  <li> CAPTCHA protection (Google reCAPTCHA)</li>
  <li> Secure Login & Logout (JWT)</li>
  <li> Create, Edit, Delete Notes</li>
  <li> View & Update Account Details</li>
  <li> Delete Account Permanently</li>
  <li> Responsive UI (Bootstrap 5)</li>
  <li> Backend validation & secured APIs</li>
  <li> Password reset with otp verification</li>
  <li> Light mode , dark mode</li>
</ul>

<h2>Tech Stack</h2>

<h3>Frontend</h3>
<ul>
  <li> React.js</li>
  <li> Bootstrap 5</li>
</ul>

<h3>Backend</h3>
<ul>
  <li> Node.js</li>
  <li> Express.js</li>
  <li> Nodemailer (for OTP)</li>
  <li> JWT for Auth</li>
  <li> Google reCAPTCHA</li>
</ul>

<h3>Database</h3>
<ul>
  <li> MongoDB with Mongoose</li>
</ul>

<h2> Getting Started</h2>

<h3> Prerequisites</h3>
<ul>
  <li>Node.js >= 14</li>
  <li>MongoDB (local/cloud)</li>
  <li>React >= 18</li>
  <li>Google reCAPTCHA keys</li>
</ul>

<h3> Project Structure</h3>

<pre>
iNotebook/
├── backend/           
│   ├── middleware/
│   ├── models/
│   ├── routes/  
│   ├── index.js 
│   └── db.js
├── server/         
│   ├── pubic/
│   ├── src/
│   │    ├── components/
│   │    ├── index.js 
│   │    └── context/Notes
│   └── .gitignore
└── README.md
</pre>

<h3>Setup Instructions</h3>

<h4>1. Clone the Repository</h4>
<pre>
git clone https://github.com/krishwq/Note-app.git
cd inotebook
</pre>  
<h4>2. Setup Backend</h4>
<pre>
cd backend
npm install
</pre>  
<ul>
<li>Create a <code> .env</code> file inside <code>/backend</code>:</li><br>
<pre>
PORT=5000
MONGO_URI=mongodb://localhost:27017/inotebook
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
</pre>  
<li>Start the backend server:</li>
<pre>npm start</pre>
</ul>
<h4>3. Setup Frontend</h4>
<pre>
cd frontend
npm install
</pre>
<ul>
<li>Create<code> .env</code> file inside <code>/client</code>:</li><br>

<pre>REACT_APP_API_URL=http://localhost:5000
REACT_APP_RECAPTCHA_SITE_KEY=your_recaptcha_site_key</pre>
<li>Start the frontend:</li>

<pre>
npm start
</pre>
</ul>
<h2> Security Highlights</h2> <ul> <li> JWT Auth with token expiry</li> <li> OTP Verification via Email (Nodemailer)</li> <li> Google reCAPTCHA on forms</li> <li> Passwords hashed with bcrypt</li> <li> MongoDB Injection Protection (Mongoose)</li> </ul> <h2> API Endpoints</h2> <h4>Auth Routes</h4> <ul> <li>POST <code>/api/auth/signup</code></li> <li>POST <code>/api/auth/verify-otp</code></li> <li>POST <code>/api/auth/login</code></li> <li>POST <code>/api/auth/logout</code></li> </ul> <h4>Note Routes</h4> <ul> <li>GET <code>/api/notes</code></li> <li>POST <code>/api/notes</code></li> <li>PUT <code>/api/notes/:id</code></li> <li>DELETE <code>/api/notes/:id</code></li> </ul> <h4>Account Routes</h4> <ul> <li>GET <code>/api/account</code></li> <li>PUT <code>/api/account</code></li> <li>DELETE <code>/api/account</code></li> </ul></p>
<h2> To Do</h2> <ul>  <li>[ ] Mobile-first Design Improvements</li> </ul>
<h2> Contributing</h2> <p>Pull requests are welcome. For major changes, please open an issue first to discuss your idea.</p>
<h2> Live Demo</h2> <p>https://note-app-opal-beta.vercel.app/</p>








