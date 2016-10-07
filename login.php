<?php
	require_once("action/LoginAction.php");
	$action = new LoginAction();
	$action->execute();

	require_once("partial/header.php");
?>

<div id="contents">
	<h2>Se connecter</h1>
	<form action="login.php" method="post">
		<div class="login-line">
			<div class="login-label">Nom d'utilisateur :</div>
			<div class="login-input"><input type="text" name="username" id="username"></div>
		</div>
		<div class="login-line">
			<div class="login-label">Mot de passe :</div>
			<div class="login-input"><input type="password" name="password" id="password"></div>
		</div>
		<div class="login-line">
			<button type="submit">S'enregistrer</button>
		</div>
	</form>
	<p>Pas de compte? <a href="register.php">Enregistrez-vous!</a></p>
</div>

<?php
	require_once("partial/footer.php");
