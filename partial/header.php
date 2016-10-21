<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" href="css/global.css">
	<title>apps-de-cours chat client</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
</head>
<body>
	<nav>
		<ul>
			<li><a href="index.php">Index</a></li>
			<li><a href="chat.php">Chat</a></li>
			<?php
			if ($action->isLoggedIn()) {
				?>
				<li>Hello, <span id="myUsername"><?= $action->getUsername() ?></span></li>
				<li><a href="?logout=true">Se déconnecter</a></li>
				<li><a href="?unregister=true">Désinscription</a></li>
				<?php
			}
			else {
				?>
				<li><a href="login.php">Se connecter</a></li>
				<li><a href="register.php">S'enregistrer</a></li>
				<?php
			}?>
		</ul>
	</nav>
