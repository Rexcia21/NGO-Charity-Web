<?php
include 'config.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error"]);
    exit;
}


$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$amount = (int)($_POST['amount'] ?? 0);
$cause = trim($_POST['cause'] ?? 'General');
$payment = trim($_POST['payment'] ?? '');

if ($name === '' || $email === '' || $amount <= 0 || $payment === '') {
    echo json_encode(["status" => "error"]);
    exit;
}

$txn = "TXN".time().rand(100,999);

$stmt = $conn->prepare('INSERT INTO donations (txn, name, email, amount, cause, payment) VALUES (?, ?, ?, ?, ?, ?)');
if (!$stmt) {
    echo json_encode(["status" => "error"]);
    exit;
}

$stmt->bind_param('sssiss', $txn, $name, $email, $amount, $cause, $payment);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "txn" => $txn,
        "name" => $name,
        "email" => $email,
        "amount" => $amount,
        "cause" => $cause,
        "payment" => $payment
    ]);
} else {
    echo json_encode(["status" => "error"]);
}

$stmt->close();
?>