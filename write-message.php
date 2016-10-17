<?php
	require_once("action/WriteMessageAction.php");
	$action = new WriteMessageAction();
	$action->execute();

	echo json_encode($action->response);
