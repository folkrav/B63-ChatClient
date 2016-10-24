<?php

	require_once("action/CommonAction.php");
	require_once("action/API.php");

	class ChatAction extends CommonAction {
		public $status = "";

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_REGISTERED);
		}

		protected function executeAction() {
			
		}
	}
