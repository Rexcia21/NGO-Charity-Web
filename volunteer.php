<?php
include 'config.php';

header('Content-Type: text/plain; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo 'error';
    exit;
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$skills = trim($_POST['skills'] ?? '');
$availability = trim($_POST['availability'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $phone === '' || $skills === '' || $availability === '' || $message === '') {
    echo 'error';
    exit;
}

$stmt = $conn->prepare('INSERT INTO volunteers (name, email, phone, skills, availability, message) VALUES (?, ?, ?, ?, ?, ?)');
if (!$stmt) {
    echo 'error';
    exit;
}

$stmt->bind_param('ssssss', $name, $email, $phone, $skills, $availability, $message);

if ($stmt->execute()) {
    echo 'success';
} else {
    echo 'error';
}

$stmt->close();
?>