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
				$_SESSION["visibility"] = CommonAction::$VISIBILITY_REGISTERED;

				header("location:chat");
				exit;
			}
			elseif ($response == "USER_IS_BANNED") {
				$this->status = "Vous êtes bannis pour une durée de 1 minute.";
			}
			elseif ($response == "INVALID_USERNAME_PASSWORD") {
				$this->status = "Nom d'utilisateur ou mot de passe invalide.";
			}

			if (isset($_GET["login-error"])) {
				$this->status = "Il faut être connecté pour accéder au chat!";
			}
			elseif (isset($_GET["deleted"])) {
				$this->status = "Votre compte a été supprimé.";
			}
			elseif (isset($_GET["registered"])) {
				$this->status = "Compte créé avec succès!";
			}
		}

		private function login() {
			$data = array(
				"username" => $_POST["username"],
				"password" => md5($_POST["password"])
			);

			return callApi(API_URL, "login", $data);
		}
	}
