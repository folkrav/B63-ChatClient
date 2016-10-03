<!DOCTYPE html>
<html>
<head>
	<title>apps-de-cours chat client</title>
</head>
<body>
	<nav>
		<ul>
			<li><a href="index.php">Index</a></li>
			<li><a href="chat.php">Chat</a></li>
			<?php
			if (!isset($_SESSION["id"])) {
				?>
				<li>Hello, <?= $_SESSION["username"] ?></li>
				<?php
			}
			else {
				?>
				<li><a href="login.php">Se connecter</a></li>
				<?php
			}?>
		</ul>
	</nav>
