const templates = {
    welcomeEmail: (name, role) => `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            .wrapper {
                background-color: #f4f4f9;
                padding: 40px 10px;
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            }
            .card {
                max-width: 600px;
                margin: 0 auto;
                background: #ffffff;
                border-radius: 15px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            }
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 50px 20px;
                text-align: center;
                color: white;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
                letter-spacing: 1px;
            }
            .body {
                padding: 40px 30px;
                color: #4a4a4a;
                line-height: 1.6;
            }
            .body h2 {
                color: #764ba2;
                margin-top: 0;
            }
            .role-badge {
                display: inline-block;
                background-color: #f0ecf9;
                color: #764ba2;
                padding: 5px 15px;
                border-radius: 20px;
                font-weight: bold;
                font-size: 14px;
                margin: 10px 0;
            }
            .button {
                display: inline-block;
                margin-top: 25px;
                padding: 15px 30px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: #ffffff !important;
                text-decoration: none;
                border-radius: 8px;
                font-weight: bold;
                box-shadow: 0 4px 15px rgba(118, 75, 162, 0.3);
            }
            .footer {
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #9b9b9b;
                background: #fafafa;
            }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="card">
                <div class="header">
                    <h1>HireHeaven</h1>
                </div>
                <div class="body">
                    <h2>Hello, ${name}!</h2>
                    <p>Welcome to the family! We are thrilled to have you join our community.</p>
                    <div class="role-badge">Account Type: ${role}</div>
                    <p>Your journey to finding the perfect match starts here. Whether you're looking for top-tier talent or your next career milestone, HireHeaven is here to make it happen.</p>
                    <a href="https://your-domain.com/dashboard" class="button">Go to Dashboard</a>
                </div>
                <div class="footer">
                    <p>&copy; 2026 HireHeaven | Built for the future of work</p>
                    <p>If you didn't create this account, please ignore this email.</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    `
};

module.exports = templates;