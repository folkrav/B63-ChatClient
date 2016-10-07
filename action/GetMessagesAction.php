<?php
	require_once("CommonAction.php");

	class GetMessagesAction extends CommonAction {
		public $messagesList;

		public function __construct() {

		}

		public function executeAction() {
			$data = array('key' => $_SESSION["key"]);
			$this->messagesList = callApi(API_URL, "read-messages", $data);
		}
	}
