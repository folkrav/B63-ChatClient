<?php
	require_once("action/ChatAction.php");
	$action = new ChatAction();
	$action->execute();

	require_once("partial/header.php");
?>

<div id="contents">
	<div id="chatControls"></div>
    <div id="chatContents">
        <div id="chatRoom"></div>
        <div id="chatUserlist"></div>
    </div>
    <div id="chatEntry"></div>
</div>

<?php
	require_once("partial/footer.php");
