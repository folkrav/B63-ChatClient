<?php
	require_once("action/LoginAction.php");
	$action = new LoginAction();
	$action->execute();

	require_once("partial/header.php");
?>
<script src="js/login.js"></script>
<div id="contents">
	<h2>Se connecter</h2>
	<?php
	if (!empty($action->status)) {
		?>
		<div class="error">
			<h3>Message</h3>
			<p><?= $action->status ?></p>
		</div>
		<?php
	}
	?>
	<form action="login.php" method="post">
		<div class="form-line">
			<div class="form-label">Nom d'utilisateur :</div>
			<div class="form-input"><input type="text" name="username" id="username"></div>
		</div>
		<div class="form-line">
			<div class="form-label">Mot de passe :</div>
			<div class="form-input"><input type="password" name="password" id="password"></div>
		</div>
		<div class="form-line">
			<div class="form-label">Style :</div>
			<div class="form-input">
				<select id="styleDropdown">
					<option value="style1">Galaga</option>
					<option value="style2">CMD</option>
					<option value="style3">Style3</option>
				</select>
			</div>
		</div>
		<div class="form-line">
			<button type="submit">Se connecter</button>
		</div>
	</form>
	<p>Pas de compte? <a href="register">Enregistrez-vous!</a></p>
</div>

<?php
	require_once("partial/footer.php");
