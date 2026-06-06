<?php
require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  jsonResponse(['status' => 'error', 'message' => 'Method not allowed'], 405);
}

$data = readJsonBody();
$id = (int)($data['id'] ?? 0);

if ($id <= 0) {
  jsonResponse(['status' => 'error', 'message' => 'Invalid request id'], 422);
}

$stmt = $pdo->prepare("DELETE FROM student_requests WHERE id = :id");
$stmt->execute([':id' => $id]);

if ($stmt->rowCount() === 0) {
  jsonResponse(['status' => 'error', 'message' => 'Request not found'], 404);
}

jsonResponse(['status' => 'success', 'message' => 'Request deleted']);
?>