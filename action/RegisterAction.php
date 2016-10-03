<?php

	require_once("action/CommonAction.php");
	require_once("action/API.php");

	class RegisterAction extends CommonAction {
		public $missingInfo = false;
		public $invalidInfo = false;
		public $wrongPassword = false;

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$required = array('studentID', 'firstName', 'lastName', 'username', 'password', 'welcomeText');
			
			foreach ($required as $field) {
				if (empty($_POST[$field])) {
					$this->missingInfo = true;
				}
			}

			if (!$this->missingInfo) {
				$resultat = $this->register();
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
			return callApi("http://apps-de-cours.com/web-chat/server/api", "register", $data);
		}
	}
