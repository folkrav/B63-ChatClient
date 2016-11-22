<?php
	session_start();
	require_once("action/Constants.php");
	require_once("action/API.php");


	abstract class CommonAction {
		public static $VISIBILITY_PUBLIC = 0;
		public static $VISIBILITY_REGISTERED = 1;

		private $pageVisibility;

		public function __construct($pageVisibility) {
			$this->pageVisibility = $pageVisibility;
		}

		public final function execute() {
			if (!empty($_GET["logout"])) {
				$data = array(
					"key" => $_SESSION["key"]
				);
				$response = callApi(API_URL, "logout", $data);
				if ($response !== "EMPTY_PARAMETER") {
					session_unset();
					session_destroy();
					session_start();
				}
			}

			if (!empty($_GET["unregister"])) {
				$data = array(
					"key" => $_SESSION["key"]
				);
				$response = callApi(API_URL, "unregister", $data);
				if ($response === "SUCCESS") {
					session_unset();
					session_destroy();
					session_start();
					header("location:login?deleted=true");
					exit;
				}
			}

			if (empty($_SESSION["visibility"])) {
				$_SESSION["visibility"] = CommonAction::$VISIBILITY_PUBLIC;
			}

			if ($_SESSION["visibility"] < $this->pageVisibility) {
				header("location:login?login-error=true");
				exit;
			}

			if (empty($_SESSION["style"])) {
				$_SESSION["style"] = "style1";
			}
			if (!empty($_GET["style"])) {
				$_SESSION["style"] = $_GET["style"];
			}

			$this->executeAction();
		}

		public function isLoggedIn() {
			return $_SESSION["visibility"] > CommonAction::$VISIBILITY_PUBLIC;
		}

		public function getUsername() {
			$username = "";

			if ($this->isLoggedIn()) {
				$username = $_SESSION["username"];
			}
			return $username;
		}

		public function getStyle() {
			return $_SESSION["style"];
		}

		protected abstract function executeAction();
	}
