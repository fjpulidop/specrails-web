<?php
// companion-signal.php — tiny WebRTC signaling mailbox for the Specrails web
// companion (specrails.dev/companion-app).
//
// It NEVER sees your data: it only relays the ~5-second WebRTC handshake (SDP)
// between a phone and its paired Specrails Desktop, then the blob self-expires.
// Once the peers connect, all real traffic is P2P (phone↔desktop, DTLS) and the
// mailbox is done. File-based, no database, nothing to install — drop this file
// in the web root and it works.
//
// API (room = an opaque, unguessable id agreed at pairing; slot is fixed):
//   POST ?room=<id>&slot=<offer|answer|req>   body = blob  → store (TTL 60s)
//   GET  ?room=<id>&slot=<offer|answer|req>               → return + delete it
//                                                           (HTTP 204 if absent)

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Cache-Control: no-store');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

const SIGNAL_TTL = 60;        // seconds a blob lives before it's discarded
const SIGNAL_MAX_BYTES = 200000; // ~200 KB cap (an SDP is only a few KB)
$validSlots = ['offer', 'answer', 'req'];

function signal_fail(int $code, string $msg): void {
    http_response_code($code);
    header('Content-Type: application/json');
    echo json_encode(['error' => $msg]);
    exit;
}

$room = isset($_GET['room']) ? (string) $_GET['room'] : '';
$slot = isset($_GET['slot']) ? (string) $_GET['slot'] : '';
if (!preg_match('/^[A-Za-z0-9_-]{8,128}$/', $room)) signal_fail(400, 'bad room');
if (!in_array($slot, $validSlots, true)) signal_fail(400, 'bad slot');

$dir = sys_get_temp_dir() . '/specrails-signal';
if (!is_dir($dir)) @mkdir($dir, 0700, true);
$file = $dir . '/' . $room . '.' . $slot;

// Opportunistic cleanup of stale blobs (bounded, cheap).
foreach (glob($dir . '/*') ?: [] as $f) {
    if (@filemtime($f) < time() - SIGNAL_TTL) @unlink($f);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = file_get_contents('php://input');
    if ($body === false) $body = '';
    if (strlen($body) > SIGNAL_MAX_BYTES) signal_fail(413, 'too large');
    @file_put_contents($file, $body, LOCK_EX);
    http_response_code(204);
    exit;
}

// GET → hand the blob over exactly once (delete on read), honouring the TTL.
if (is_file($file) && @filemtime($file) >= time() - SIGNAL_TTL) {
    $body = @file_get_contents($file);
    @unlink($file);
    header('Content-Type: application/octet-stream');
    echo $body !== false ? $body : '';
} else {
    http_response_code(204);
}
