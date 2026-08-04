

export  const resetPasswordTemplate = (link: string) : string =>  {

 return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset password</title>
    <style>
        /* minimal, clean, simple */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: #f3f6fa;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        .card {
            max-width: 440px;
            width: 100%;
            background: #ffffff;
            padding: 32px 28px;
            border-radius: 24px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
            border: 1px solid #eaedf2;
        }

        .logo {
            font-size: 20px;
            font-weight: 600;
            color: #111827;
            letter-spacing: -0.3px;
            margin-bottom: 8px;
        }

        .logo span {
            color: #2563eb;
        }

        h2 {
            font-size: 22px;
            font-weight: 700;
            color: #111827;
            margin: 16px 0 6px 0;
            letter-spacing: -0.3px;
        }

        p {
            color: #4b5563;
            font-size: 15px;
            line-height: 1.5;
            margin: 8px 0 16px 0;
        }

        .link-box {
            background: #f8fafc;
            border: 1px solid #e5e9ef;
            border-radius: 14px;
            padding: 12px 16px;
            margin: 12px 0 18px 0;
            word-break: break-all;
            font-size: 14px;
            font-family: "SF Mono", Menlo, monospace;
            color: #1e293b;
        }

        .btn {
            display: block;
            width: 100%;
            background: #111827;
            color: white;
            font-weight: 600;
            font-size: 16px;
            padding: 13px 0;
            border-radius: 40px;
            text-align: center;
            text-decoration: none;
            transition: 0.15s;
            border: none;
            margin: 10px 0 6px 0;
        }

        .btn:hover {
            background: #1f2a3f;
        }

        .footnote {
            font-size: 13px;
            color: #6b7280;
            margin-top: 18px;
            border-top: 1px solid #edf0f5;
            padding-top: 16px;
            line-height: 1.5;
        }

        .footnote a {
            color: #1e293b;
            text-decoration: none;
            border-bottom: 1px dotted #d1d9e6;
        }

        .footnote a:hover {
            border-bottom: 1px solid #1e293b;
        }

        .meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 6px;
            font-size: 12px;
            color: #9ca3af;
        }

        .badge {
            background: #eef2f6;
            padding: 2px 10px;
            border-radius: 30px;
            font-size: 11px;
            color: #374151;
        }

        /* dark mode support */
        @media (prefers-color-scheme: dark) {
            body {
                background: #111827;
            }
            .card {
                background: #1f2937;
                border-color: #374151;
            }
            .logo {
                color: #f3f4f6;
            }
            .logo span {
                color: #60a5fa;
            }
            h2 {
                color: #f9fafb;
            }
            p {
                color: #d1d5db;
            }
            .link-box {
                background: #111827;
                border-color: #374151;
                color: #e5e7eb;
            }
            .btn {
                background: #3b82f6;
            }
            .btn:hover {
                background: #2563eb;
            }
            .footnote {
                border-top-color: #374151;
                color: #9ca3af;
            }
            .footnote a {
                color: #d1d5db;
                border-bottom-color: #4b5563;
            }
            .footnote a:hover {
                border-bottom-color: #d1d5db;
            }
            .badge {
                background: #374151;
                color: #d1d5db;
            }
            .meta {
                color: #6b7280;
            }
        }

        /* tiny screens */
        @media (max-width: 460px) {
            .card {
                padding: 24px 18px;
            }
            h2 {
                font-size: 20px;
            }
        }
    </style>
</head>
<body>

    <div class="card">
        <!-- simple brand -->
        <div class="logo">Canny<span>‑clone</span></div>

        <h2>Reset password</h2>

        <p>
            We received a request to reset your password.
            Click the button below to set a new one.
        </p>

        <!-- dynamic link (display only) -->
        <div class="link-box" id="resetLinkDisplay">
            ${link}
        </div>

        <!-- main CTA -->
        <a href="${link}" class="btn" id="resetButton">Reset password</a>

        <!-- simple footer -->
        <div class="footnote">
            <div>If the button doesn’t work, copy the link above into your browser.</div>
            <div class="meta">
                <span>🔒 expires in 1 hour</span>
                <span class="badge">secure</span>
            </div>
        </div>
    </div>


</body>
</html>`
} 