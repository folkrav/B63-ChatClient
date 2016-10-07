<?php
	require_once("action/GetMessagesAction.php");
	$action = new GetMessagesAction();
	$action->execute();

	echo json_encode($action->messagesList);
