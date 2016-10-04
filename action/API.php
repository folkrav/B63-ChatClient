<?php

    function callApi($url, $service, array $data) {
        $data = json_encode($data);			// Encodage des données/paramètres
		$data = urlencode($data);			// Encodage pour être un URL valide

		// Appel au serveur et décodage de la réponse
		return json_decode(file_get_contents($url . "/" . $service . "?data=" . $data));
    }
