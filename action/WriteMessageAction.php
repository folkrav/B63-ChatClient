<?php
	require_once("CommonAction.php");

	class WriteMessageAction extends CommonAction {
		public $response;

		public function __construct() {

		}

		public function executeAction() {
			if (!empty($_POST["chatMessage"])) {
				$data = array(
					'key' => $_SESSION["key"],
					'messages' => $_POST["chatMessage"]
				);
				$this->response = callApi(API_URL, "write-messages", $data);
			}
		}
	}
