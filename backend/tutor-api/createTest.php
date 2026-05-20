<?php
require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  jsonResponse(['status' => 'error', 'message' => 'Method not allowed'], 405);
}

$data = readJsonBody();
$id = trim((string)($data['id'] ?? ''));
$title = trim((string)($data['title'] ?? ''));
$className = trim((string)($data['className'] ?? ''));
$subject = trim((string)($data['subject'] ?? ''));
$date = trim((string)($data['date'] ?? ''));
$createdBy = trim((string)($data['createdBy'] ?? ''));

if ($id === '' || $title === '' || $className === '' || $subject === '' || $date === '' || $createdBy === '') {
  jsonResponse(['status' => 'error', 'message' => 'Invalid test payload'], 422);
}

$stmt = $pdo->prepare(
  "INSERT INTO tests (id, title, class_name, subject, test_date, created_by)
   VALUES (:id, :title, :class_name, :subject, :test_date, :created_by)
   ON DUPLICATE KEY UPDATE
    title = VALUES(title),
    class_name = VALUES(class_name),
    subject = VALUES(subject),
    test_date = VALUES(test_date),
    created_by = VALUES(created_by)"
);

$stmt->execute([
  ':id' => $id,
  ':title' => $title,
  ':class_name' => $className,
  ':subject' => $subject,
  ':test_date' => $date,
  ':created_by' => $createdBy,
]);

jsonResponse(['status' => 'success', 'message' => 'Test saved']);
?>
