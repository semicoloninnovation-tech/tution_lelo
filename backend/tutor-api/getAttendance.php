<?php
require __DIR__ . '/bootstrap.php';

$stmt = $pdo->query("SELECT attendance_date AS date, student_id AS studentId, teacher_id AS teacherId, status FROM attendance ORDER BY attendance_date DESC, id DESC");
$rows = $stmt->fetchAll();

jsonResponse($rows);
?>
