<?php
require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  jsonResponse(['status' => 'error', 'message' => 'Method not allowed'], 405);
}

$data = readJsonBody();
$email = trim((string)($data['email'] ?? ''));
$password = (string)($data['password'] ?? '');

if ($email === '' || $password === '') {
  jsonResponse(['status' => 'error', 'message' => 'Email and password are required'], 422);
}

$stmt = $pdo->prepare(
  "SELECT ta.teacher_id, ta.email, ta.password_hash, m.name, m.subject
   FROM teacher_auth ta
   INNER JOIN members m ON m.id = ta.teacher_id
   WHERE ta.email = :email
   LIMIT 1"
);

$stmt->execute([':email' => $email]);
$row = $stmt->fetch();

if (!$row || !password_verify($password, $row['password_hash'])) {
  jsonResponse(['status' => 'error', 'message' => 'Invalid email or password'], 401);
}

jsonResponse([
  'status' => 'success',
  'teacher' => [
    'id' => $row['teacher_id'],
    'name' => $row['name'],
    'email' => $row['email'],
    'subject' => $row['subject'],
  ],
]);
?>
