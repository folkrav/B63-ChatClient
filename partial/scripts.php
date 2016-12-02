<?php
    if ($action->getStyle() === "style3") {
        ?>
        <link href="https://fonts.googleapis.com/css?family=Audiowide" rel="stylesheet">
        <?php
    }
?>
<link rel="stylesheet" href="css/<?= $action->getStyle() ?>.css">
<script src="js/<?= $action->getStyle() ?>.js"></script>
