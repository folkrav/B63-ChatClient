<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="utf-8">
	<title>apps-de-cours chat client</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<link rel="stylesheet" href="css/<?= $action->getStyle() ?>.css">
	<script src="js/<?= $action->getStyle() ?>.js"></script>
</head>
<body>
	<nav>
		<ul>
			<a href="chat"><li>Chat</li></a>
			<?php
			if ($action->isLoggedIn()) {
				?>
				<li>Hello, <span id="myUsername"><?= $action->getUsername() ?></span></li>
				<a href="?logout=true"><li>Se déconnecter</li></a>
				<a href="?unregister=true"><li>Désinscription</li></a>
				<?php
			}
			else {
				?>
				<li><a href="login">Se connecter</a></li>
				<li><a href="register">S'enregistrer</a></li>
				<?php
			}?>
		</ul>
	</nav>
