<?php

	require_once("action/CommonAction.php");
	require_once("action/API.php");

	class LoginAction extends CommonAction {
		public $status = "";

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$response = "";
			if (!empty($_POST)) {
				$response = $this->login();
			}
			
			if (strlen($response) === 32) {
				$_SESSION["key"] = $response;
				$_SESSION["username"] = $_POST["username"];
				header("location:index.php");
				exit;
			}
		}

		private function login() {
			$data = array(
				"username" => $_POST["username"],
				"password" => md5($_POST["password"]));
			
			return callApi(API_URL, "login", $data);
		}
	}
