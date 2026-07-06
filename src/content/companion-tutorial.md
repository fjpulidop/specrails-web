# How to Use Specrails (Companion)

Check your AI pipeline from your phone — paired directly to your desktop, no accounts, no server in the middle.

---

## What is Specrails (Companion)?

Specrails (Companion) is a mobile PWA (Progressive Web App) that lets you monitor and control your Specrails (Desktop) pipeline from your phone or tablet. Once paired, your phone talks directly to your desktop over a peer-to-peer encrypted connection (WebRTC with DTLS). No account to create, no cloud service handling your data.

A small public mailbox at `specrails.dev/companion-signal.php` relays the ~5-second pairing handshake (the WebRTC SDP exchange) and nothing else. The moment the connection is established, the mailbox is done — all subsequent traffic goes phone-to-desktop, and the mailbox never sees any of it.

**What you can do once paired:**

- Watch pipeline jobs run in real time.
- Browse your spec board and backlog.
- Trigger and cancel runs.
- View job logs and results.

---

## Prerequisites

- **Specrails (Desktop)** installed and running on your Mac. The Companion feature requires the desktop app's local server to be active — it starts automatically when Specrails (Desktop) launches. See [Install Specrails (Desktop)](/docs/hub-installation) if you haven't done this yet.
- A phone or tablet with a modern browser (Safari on iOS, Chrome on Android) and access to `specrails.dev` (any internet connection works).
- Both devices need to be able to reach `specrails.dev` for the brief pairing handshake (about 5 seconds). After that, they need only reach each other — typically on the same local network, or via NAT traversal over the internet.

---

## Step 1 — Enable the Mobile Companion in Desktop

1. Open **Specrails (Desktop)** on your Mac.
2. Go to **Settings** in the left sidebar.
3. Find the **Mobile companion** section and toggle it on. Desktop starts a small local listener (port 4202 by default) that the companion will connect to.

---

## Step 2 — Open the Pairing Screen

Still in Desktop, navigate to **Settings → Mobile companion → Pair web companion**.

Desktop generates a WebRTC offer and displays it as a **QR code**. This QR encodes the connection parameters needed for your phone to reach your desktop — it is single-use and expires in about 60 seconds. If it expires before you scan it, click the button again to generate a new one.

---

## Step 3 — Open the Companion App on Your Phone

On your phone, open your browser and go to:

```
https://specrails.dev/companion-app
```

> **Tip — add it to your home screen.** On iOS: tap the Share button → "Add to Home Screen". On Android: tap the browser menu → "Add to Home Screen" or "Install app". This gives you a native-feeling app icon and hides the browser chrome.

---

## Step 4 — Scan the QR (or enter the code manually)

In the companion app, tap **Pair with Desktop**. The app will ask to use your camera to scan the QR code shown in Desktop.

Point your camera at the QR on your desktop screen. The companion reads the connection parameters and starts the WebRTC handshake.

If your camera is unavailable, you can also enter the pairing code manually — tap **Enter code instead** and type the short code shown beneath the QR in Desktop.

---

## Step 5 — The Handshake (about 5 seconds)

During the handshake:

1. Your phone sends its WebRTC answer back through the `companion-signal.php` mailbox (a few kilobytes of SDP text, nothing else).
2. Desktop picks up the answer (it polls the mailbox every 3 seconds), completes the DTLS negotiation, and the peer-to-peer connection opens.
3. The companion app transitions to the main dashboard.

The entire exchange takes roughly 5 seconds on a normal connection. The mailbox blob self-deletes after being read, and the mailbox TTL is 60 seconds in any case.

**You are now connected.** All communication from this point on goes directly between your phone and Desktop — the mailbox is not involved again.

---

## Reconnecting After a Page Reload

You do not need to re-scan the QR every time. When you reopen the companion app after closing or reloading it, it drops a reconnect request into the mailbox. Desktop detects this automatically (it polls every 3 seconds), sends a fresh offer, and the connection re-establishes within a few seconds — no camera needed.

Your device stays paired until you revoke it. Desktop keeps a list of paired devices under **Settings → Mobile companion → Paired devices**; you can revoke any device from there.

---

## Security Model

| What happens | Detail |
|---|---|
| **Pairing handshake** | Relayed through `companion-signal.php` (SDP only, ~5 KB, self-deletes after read, 60 s TTL) |
| **All other traffic** | Direct phone-to-desktop, encrypted with DTLS |
| **Your data** | Never touches the mailbox or any external server |
| **Authentication** | Each paired device receives a unique token stored on your phone; Desktop validates it on every request |
| **Revocation** | Revoking a device from Desktop immediately invalidates its token |

The mailbox is a stateless PHP file that stores SDP blobs in `/tmp` — it has no database, no logging, and no access to your pipeline data. You can inspect the full source at `public/companion-signal.php` in the [specrails-web repo](https://github.com/fjpulidop/specrails-web).

---

## Troubleshooting

**The QR expired before I could scan it.**
Click "Pair web companion" again to generate a fresh QR. QR codes are single-use and expire after 60 seconds.

**The companion shows "Connecting…" for more than 15 seconds.**
Both devices need to reach `specrails.dev` for the handshake. Check that your phone has an internet connection. If Desktop is behind a strict corporate firewall or VPN, the WebRTC NAT traversal may fail — try on a home or mobile network instead.

**The connection keeps dropping.**
WebRTC uses NAT traversal (STUN) to punch through most routers. If your network uses symmetric NAT (common in some office environments), the P2P path may not open reliably. Switching to a hotspot or a less restrictive network usually resolves this.

**I want to unpair a device.**
In Desktop: **Settings → Mobile companion → Paired devices**, then click the revoke button next to the device. The companion will be disconnected immediately.

**I want to reset all pairings.**
In Desktop: **Settings → Mobile companion → Reset mobile identity**. This rotates the desktop certificate and revokes all paired devices. Every phone will need to re-pair.

---

## What's Next?

- [Specrails (Desktop) Features](/docs/hub-features) — full reference for the desktop dashboard.
- [Install Specrails (Desktop)](/docs/hub-installation) — if you haven't set up Desktop yet.
- [Core vs Desktop](/docs/core-vs-hub) — understand how the two products relate.
