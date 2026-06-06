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

$check = $pdo->prepare("SELECT id FROM student_requests WHERE id = :id");
$check->execute([':id' => $id]);

if (!$check->fetch()) {
  jsonResponse(['status' => 'error', 'message' => 'Request not found'], 404);
}

$stmt = $pdo->prepare(
  "UPDATE student_requests SET status = 'Approved' WHERE id = :id"
);
$stmt->execute([':id' => $id]);

jsonResponse(['status' => 'success', 'message' => 'Request approved']);
?>