<?php
	require_once("action/ChatAction.php");
	$action = new ChatAction();
	$action->execute();

	require_once("partial/header.php");
?>
<script src="js/chat.js"></script>
<div id="contents">
    <div id="chatContents">
        <div id="chatRoom"></div>
        <div id="chatUserlist"></div>
    </div>
    <div id="chatEntry">
        <form id="chatForm" method="post">
            <textarea placeholder="Entrez un message..." name="chatMessage" id="chatMessage"></textarea>
        </form>
    </div>
</div>
<div id="styleContents">
    <div id="styleCanvas">

    </div>
</div>

<?php
	require_once("partial/footer.php");
