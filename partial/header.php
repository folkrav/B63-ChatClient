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
			if ($action->isLoggedIn()) {
				?>
				<li>Hello, <?= $action->getUsername() ?></li>
				<li><a href="?logout=true">Se déconnecter</a></li>
				<?php
			}
			else {
				?>
				<li><a href="login.php">Se connecter</a></li>
				<?php
			}?>
		</ul>
	</nav>
