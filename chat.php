<?php
	require_once("action/ChatAction.php");
	$action = new ChatAction();
	$action->execute();

	require_once("partial/header.php");
?>

<div id="contents">
    <div id="chatContents">
        <div id="chatRoom">test</div>
        <div id="chatUserlist">
            <h4>Utilisateurs connectés</h4>
            <ul>
                <?php
                // list users
                ?>
            </ul>
        </div>
    </div>
    <div id="chatEntry"><textarea rows="3" cols="95" placeholder="Entrez un message..."></textarea></div>
</div>

<?php
	require_once("partial/footer.php");
