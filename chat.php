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
            <textarea rows="5" cols="106" placeholder="Entrez un message..." name="chatMessage"></textarea>
            <input type="hidden" name="username" value="<?= $action->getUsername() ?>">
            <input type="submit" value="Envoyer">
        </form>
    </div>
</div>

<?php
	require_once("partial/footer.php");
