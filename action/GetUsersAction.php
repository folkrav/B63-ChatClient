<?php
	require_once("CommonAction.php");

	class GetUsersAction extends CommonAction {
		public $userList;

		public function __construct() {

		}

		public function executeAction() {
			$data = array('key' => $_SESSION["key"]);
			$this->userList = callApi(API_URL, "read-members", $data);
		}
	}
