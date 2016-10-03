<?php
	require_once("action/IndexAction.php");
	$action = new IndexAction();
	$action->execute();

	require_once("partial/header.php");
?>

<div id="contents">
	Hello!
</div>

<?php
	require_once("partial/footer.php");
