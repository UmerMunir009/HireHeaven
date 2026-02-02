const templates = {
    welcomeEmail: (name, role) => `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            .wrapper { background-color: #f4f4f9; padding: 40px 10px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
            .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 50px 20px; text-align: center; color: white; }
            .header h1 { margin: 0; font-size: 28px; letter-spacing: 1px; }
            .body { padding: 40px 30px; color: #4a4a4a; line-height: 1.6; }
            .body h2 { color: #764ba2; margin-top: 0; }
            .role-badge { display: inline-block; background-color: #f0ecf9; color: #764ba2; padding: 5px 15px; border-radius: 20px; font-weight: bold; font-size: 14px; margin: 10px 0; }
            .button { display: inline-block; margin-top: 25px; padding: 15px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: bold; box-shadow: 0 4px 15px rgba(118, 75, 162, 0.3); }
            .footer { padding: 20px; text-align: center; font-size: 12px; color: #9b9b9b; background: #fafafa; }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="card">
                <div class="header"><h1>HireHeaven</h1></div>
                <div class="body">
                    <h2>Hello, ${name}!</h2>
                    <p>Welcome to the family! We are thrilled to have you join our community.</p>
                    <div class="role-badge">Account Type: ${role}</div>
                    <p>Your journey to finding the perfect match starts here. HireHeaven is here to make it happen.</p>
                    <a href="https://your-domain.com/dashboard" class="button">Go to Dashboard</a>
                </div>
                <div class="footer">
                    <p>&copy; 2026 HireHeaven | Built for the future of work</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    `,

    forgotPasswordEmail: (name, resetLink) => `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            .wrapper { background-color: #f8f9fc; padding: 40px 10px; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
            .card { max-width: 550px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 15px 35px rgba(118, 75, 162, 0.1); border: 1px solid #eef0f5; }
            .top-bar { height: 8px; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); }
            .body { padding: 50px 40px; text-align: center; color: #2d3748; }
            .icon-circle { width: 70px; height: 70px; background: #f0ecf9; border-radius: 50%; margin: 0 auto 25px; display: flex; align-items: center; justify-content: center; }
            .body h1 { color: #1a202c; font-size: 24px; margin-bottom: 15px; }
            .body p { font-size: 16px; line-height: 1.6; color: #718096; }
            .btn-reset { display: inline-block; margin-top: 30px; padding: 16px 35px; background: #764ba2; color: #ffffff !important; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 16px; transition: transform 0.2s; box-shadow: 0 6px 20px rgba(118, 75, 162, 0.25); }
            .expiry-note { margin-top: 25px; font-size: 13px; color: #a0aec0; font-style: italic; }
            .divider { margin: 35px 0; border-top: 1px solid #edf2f7; }
            .footer { padding-bottom: 40px; text-align: center; font-size: 12px; color: #a0aec0; }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="card">
                <div class="top-bar"></div>
                <div class="body">
                    <div class="icon-circle">
                        <span style="font-size: 30px;">🔒</span>
                    </div>
                    <h1>Password Reset Request</h1>
                    <p>Hello <strong>${name}</strong>,</p>
                    <p>We received a request to reset your HireHeaven account password. No worries, it happens to the best of us!</p>
                    <a href="${resetLink}" class="btn-reset">Reset My Password</a>
                    <p class="expiry-note">This link is valid for 15 minutes only.</p>
                    <div class="divider"></div>
                    <p style="font-size: 12px;">If you didn't request this change, please ignore this email or contact support if you have concerns.</p>
                </div>
            </div>
            <div class="footer">
                <p>&copy; 2026 HireHeaven Platform</p>
            </div>
        </div>
    </body>
    </html>
    `
};

module.exports = templates;