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
        <textarea rows="5" cols="106" placeholder="Entrez un message..."></textarea>
        <input type="button" value="Envoyer" onclick="sendMessage()">
    </div>
</div>

<?php
	require_once("partial/footer.php");
