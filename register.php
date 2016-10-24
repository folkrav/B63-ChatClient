<?php
	require_once("action/RegisterAction.php");
	$action = new RegisterAction();
	$action->execute();

	require_once("partial/header.php");
?>
	
<div id="contents">
	<h2>Enregistrez-vous</h1>
	<form action="register.php" method="post">
		<div class="form-line">
			<div class="form-label">Matricule :</div>
			<div class="form-input"><input type="text" name="studentID" id="studentID"></div>
		</div>
		<div class="form-line">
			<div class="form-label">Nom d'utilisateur :</div>
			<div class="form-input"><input type="text" name="username" id="username"></div>
		</div>
		<div class="form-line">
			<div class="form-label">Mot de passe :</div>
			<div class="form-input"><input type="password" name="password" id="password"></div>
		</div>
		<div class="form-line">
			<div class="form-label">Prénom :</div>
			<div class="form-input"><input type="text" name="firstName" id="firstName"></div>
		</div>
		<div class="form-line">
			<div class="form-label">Nom de famille :</div>
			<div class="form-input"><input type="text" name="lastName" id="lastName"></div>
		</div>
		<div class="form-line">
			<div class="form-label">Message d'accueil :</div>
			<div class="form-input"><input type="text" name="welcomeText" id="welcomeText"></div>
		</div>
		<div class="form-line">
			<button type="submit">S'enregistrer</button>
		</div>
	</form>
</div>

<?php
	require_once("partial/footer.php");
