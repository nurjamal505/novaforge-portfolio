# Telegram Worker setup
1. In Telegram open @BotFather → /newbot → copy the BOT_TOKEN.
2. Send any message to your new bot, then open `https://api.telegram.org/bot<TOKEN>/getUpdates` in your browser and copy `chat.id` (do not share the link).
3. `cd server && npx wrangler login`
4. `npx wrangler secret put BOT_TOKEN` and `npx wrangler secret put CHAT_ID`
5. Check `ALLOWED_ORIGINS` in `wrangler.toml` (site origin, no path).
6. `npx wrangler deploy` → copy the `*.workers.dev` URL.
7. Put the URL in `assets/js/config.js` (`ENDPOINT`), commit, push.
8. Test: submit the form on contact.html; the message must arrive in Telegram. Also test an empty message and a wrong origin (expect 400/403).
9. Token leaked? Use @BotFather → /revoke, then `wrangler secret put BOT_TOKEN` again.
Note: rate limiting is in-memory per Worker instance (basic protection only).
