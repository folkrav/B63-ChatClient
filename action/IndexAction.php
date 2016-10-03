<?php

	require_once("action/CommonAction.php");
	require_once("action/API.php");

	class IndexAction extends CommonAction {
		public $response = "";

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			
			if (!empty($_POST)) {
				$response = $this->login();
			}

		}

	}
