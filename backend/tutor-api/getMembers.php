<?php
require __DIR__ . '/bootstrap.php';

$stmt = $pdo->query("SELECT id, name, role, class_name AS className, subject FROM members ORDER BY created_at DESC");
$rows = $stmt->fetchAll();

jsonResponse($rows);
?>
