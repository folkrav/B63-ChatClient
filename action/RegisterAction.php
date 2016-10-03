<?php

	require_once("action/CommonAction.php");
	require_once("action/API.php");

	class RegisterAction extends CommonAction {
		public $missingInfo = false;
		public $invalidInfo = false;

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
				
			}
		}
	}
