<?php

require_once "config.php";

$message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $email = trim($_POST["email"]);
    $password = $_POST["password"];

    $stmt = $conn->prepare(
        "SELECT id, name, password
         FROM members
         WHERE email = ?"
    );

    $stmt->bind_param("s", $email);

    $stmt->execute();

    $result = $stmt->get_result();

    $member = $result->fetch_assoc();

    if (
        $member &&
        password_verify(
            $password,
            $member["password"]
        )
    ) {

        $_SESSION["member_id"] = $member["id"];

        $_SESSION["member_name"] =
            $member["name"];

        header("Location: member.php");

        exit;

    } else {

        $message =
            "Invalid email or password.";
    }
}

?>

<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>
        Prayer Request System
    </title>

    <link
        rel="stylesheet"
        href="assets/style.css"
    >

</head>

<body>

<div class="container">

    <div class="card">

        <h1>
            Prayer Request System
        </h1>

        <h2>
            Member Login
        </h2>

        <?php if ($message): ?>

            <p class="error">

                <?= htmlspecialchars($message) ?>

            </p>

        <?php endif; ?>

        <form method="POST">

            <label>
                Email Address
            </label>

            <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
            >

            <label>
                Password
            </label>

            <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
            >

            <button type="submit">
                Login
            </button>

        </form>

        <p>

            Don't have an account?

            <a href="register.php">
                Register
            </a>

        </p>

        <p>

            <a href="admin/login.php">
                Administrator Login
            </a>

        </p>

    </div>

</div>

</body>

</html>