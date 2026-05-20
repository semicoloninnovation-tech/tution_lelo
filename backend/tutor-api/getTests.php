<?php
require __DIR__ . '/bootstrap.php';

$stmt = $pdo->query("SELECT id, title, class_name AS className, subject, test_date AS date, created_by AS createdBy FROM tests ORDER BY test_date DESC, created_at DESC");
$rows = $stmt->fetchAll();

jsonResponse($rows);
?>
