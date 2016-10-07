<?php
	require_once("action/GetUsersAction.php");
	$action = new GetUsersAction();
	$action->execute();

	echo json_encode($action->userList);
