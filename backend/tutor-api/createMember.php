<?php
require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  jsonResponse(['status' => 'error', 'message' => 'Method not allowed'], 405);
}

$data = readJsonBody();
$id = trim((string)($data['id'] ?? ''));
$name = trim((string)($data['name'] ?? ''));
$role = trim((string)($data['role'] ?? ''));
$className = trim((string)($data['className'] ?? ''));
$subject = trim((string)($data['subject'] ?? ''));

if ($id === '' || $name === '' || !in_array($role, ['student', 'teacher'], true)) {
  jsonResponse(['status' => 'error', 'message' => 'Invalid member payload'], 422);
}

if ($role === 'student' && $className === '') {
  jsonResponse(['status' => 'error', 'message' => 'Class is required for student'], 422);
}

if ($role === 'teacher' && $subject === '') {
  jsonResponse(['status' => 'error', 'message' => 'Subject is required for teacher'], 422);
}

$stmt = $pdo->prepare(
  "INSERT INTO members (id, name, role, class_name, subject)
   VALUES (:id, :name, :role, :class_name, :subject)
   ON DUPLICATE KEY UPDATE
     name = VALUES(name),
     role = VALUES(role),
     class_name = VALUES(class_name),
     subject = VALUES(subject)"
);

$stmt->execute([
  ':id' => $id,
  ':name' => $name,
  ':role' => $role,
  ':class_name' => $className,
  ':subject' => $subject,
]);

jsonResponse(['status' => 'success', 'message' => 'Member saved']);
?>
