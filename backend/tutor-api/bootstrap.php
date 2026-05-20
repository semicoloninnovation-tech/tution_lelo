<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

$host = 'localhost';
$dbname = 'tuitionlelo';
$user = 'root';
$pass = '';

try {
  $pdo = new PDO(
    "mysql:host={$host};dbname={$dbname};charset=utf8mb4",
    $user,
    $pass,
    [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]
  );
} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode([
    'status' => 'error',
    'message' => 'Database connection failed',
  ]);
  exit;
}

function readJsonBody() {
  $raw = file_get_contents('php://input');
  if (!$raw) {
    return [];
  }

  $data = json_decode($raw, true);
  if (!is_array($data)) {
    return [];
  }

  return $data;
}

function jsonResponse($payload, $statusCode = 200) {
  http_response_code($statusCode);
  echo json_encode($payload);
  exit;
}
?>
