<?php
	require_once("CommonAction.php");

	class WriteMessageAction extends CommonAction {
		public $response;

		public function __construct() {

		}

		public function executeAction() {
			$data = array(
				'key' => $_SESSION["key"],
				'message' => $_POST["message"]
			);
			$this->response = callApi(API_URL, "write-message", $data);
		}
	}
