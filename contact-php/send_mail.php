<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = htmlspecialchars($_POST["nom"]);
    $prenom = htmlspecialchars($_POST["prenom"]);
    $email = filter_var($_POST["email"], FILTER_VALIDATE_EMAIL);
    $message = htmlspecialchars($_POST["message"]);

    if (!$email) {
        die("Adresse e-mail invalide.");
    }

    $to = "leblanc.yann1@gmail.com"; // Remplace par ton adresse e-mail
    $subject = "Nouveau message de $nom $prenom";
    $body = "Nom: $nom\nPrénom: $prenom\nE-mail: $email\n\nMessage:\n$message";
    $headers = "From: $email\r\nReply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "Message envoyé avec succès.";
    } else {
        echo "Erreur lors de l'envoi du message.";
    }
} else {
    echo "Méthode non autorisée.";
}
?>
