<?php

	require_once("action/CommonAction.php");
	require_once("action/API.php");

	class RegisterAction extends CommonAction {
		public $status = "";

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			if (!empty($_POST)) {
				$status = $this->register();

				if ($status === "SUCCESS") {
					header("location:login?registered=true");
					exit;
				}
			}
		}

		private function register() {
			$data = array(
				"no" => $_POST["studentID"],
				"firstName" => $_POST["firstName"],
				"lastName" => $_POST["lastName"],
				"username" => $_POST["username"],
				"password" => md5($_POST["password"]),
				"welcomeText" => $_POST["welcomeText"]);

			return callApi(API_URL, "register", $data);
		}
	}
