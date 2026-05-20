<?php
require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  jsonResponse(['status' => 'error', 'message' => 'Method not allowed'], 405);
}

$data = readJsonBody();
$date = trim((string)($data['date'] ?? ''));
$studentId = trim((string)($data['studentId'] ?? ''));
$teacherId = trim((string)($data['teacherId'] ?? ''));
$status = trim((string)($data['status'] ?? ''));

if ($date === '' || $studentId === '' || $teacherId === '' || !in_array($status, ['Present', 'Absent'], true)) {
  jsonResponse(['status' => 'error', 'message' => 'Invalid attendance payload'], 422);
}

$stmt = $pdo->prepare(
  "INSERT INTO attendance (attendance_date, student_id, teacher_id, status)
   VALUES (:attendance_date, :student_id, :teacher_id, :status)"
);

$stmt->execute([
  ':attendance_date' => $date,
  ':student_id' => $studentId,
  ':teacher_id' => $teacherId,
  ':status' => $status,
]);

jsonResponse(['status' => 'success', 'message' => 'Attendance saved']);
?>
