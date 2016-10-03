<?php
	require_once("action/RegisterAction.php");
	$action = new RegisterAction();
	$action->execute();

	require_once("partial/header.php");
?>
	
<div id="contents">
	<h2>Enregistrez-vous</h1>
	<form action="register.php" method="post">
		<div class="login-line">
			<div class="login-label">Matricule :</div>
			<div class="login-input"><input type="text" name="studentID" id="studentID"></div>
		</div>
		<div class="login-line">
			<div class="login-label">Nom d'utilisateur :</div>
			<div class="login-input"><input type="text" name="username" id="username"></div>
		</div>
		<div class="login-line">
			<div class="login-label">Mot de passe :</div>
			<div class="login-input"><input type="password" name="password" id="password"></div>
		</div>
<!-- 		<div class="login-line">
			<div class="login-label">Confirmer le mot de passe :</div>
			<div class="login-input"><input type="password" name="password" id="password"></div>
		</div> -->
		<div class="login-line">
			<div class="login-label">Prénom :</div>
			<div class="login-input"><input type="text" name="firstName" id="firstName"></div>
		</div>
		<div class="login-line">
			<div class="login-label">Nom de famille :</div>
			<div class="login-input"><input type="text" name="lastName" id="lastName"></div>
		</div>
		<div class="login-line">
			<div class="login-label">Message d'accueil :</div>
			<div class="login-input"><input type="text" name="welcomeText" id="welcomeText"></div>
		</div>
		<div class="login-line">
			<button type="submit">S'enregistrer</button>
		</div>
	</form>
</div>

<?php
	require_once("partial/footer.php");
