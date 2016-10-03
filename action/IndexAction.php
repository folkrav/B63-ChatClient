<?php

	require_once("action/CommonAction.php");
	require_once("action/API.php");

	class IndexAction extends CommonAction {
		public $status = "";

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			
		}
	}
