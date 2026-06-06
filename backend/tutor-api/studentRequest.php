<?php
require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  jsonResponse(['status' => 'error', 'message' => 'Method not allowed'], 405);
}

$data = readJsonBody();
$name = trim((string)($data['name'] ?? ''));
$studentClass = trim((string)($data['studentClass'] ?? ''));
$location = trim((string)($data['location'] ?? ''));
$contact = trim((string)($data['contact'] ?? ''));
$subject = trim((string)($data['subject'] ?? ''));
$subjects = trim((string)($data['subjects'] ?? ''));
$tutor = trim((string)($data['tutor'] ?? ''));

if ($name === '' || $studentClass === '' || $location === '' || $contact === '') {
  jsonResponse(['status' => 'error', 'message' => 'Invalid request payload'], 422);
}

$stmt = $pdo->prepare(
  "INSERT INTO student_requests (name, student_class, location, contact, subject, subjects, tutor, status)
   VALUES (:name, :student_class, :location, :contact, :subject, :subjects, :tutor, 'Pending')"
);

$stmt->execute([
  ':name' => $name,
  ':student_class' => $studentClass,
  ':location' => $location,
  ':contact' => $contact,
  ':subject' => $subject,
  ':subjects' => $subjects,
  ':tutor' => $tutor,
]);

jsonResponse(['status' => 'success', 'message' => 'Tutor request submitted']);
?>