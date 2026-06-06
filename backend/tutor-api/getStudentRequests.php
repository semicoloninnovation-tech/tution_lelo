<?php
require __DIR__ . '/bootstrap.php';

$stmt = $pdo->query(
  "SELECT id, name, student_class AS studentClass, location, contact, status, subject, subjects, tutor
   FROM student_requests
   ORDER BY id DESC"
);

$rows = $stmt->fetchAll();
jsonResponse($rows);
?>