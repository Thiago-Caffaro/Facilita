<?php
    require_once __DIR__ . '/vendor/autoload.php';
    
    use MongoDB\Client;
    
    // A string de conexão vem de variável de ambiente (antes estava escrita direto no código)
    $mongoClient = new MongoDB\Client(getenv('MONGO_CONNECTION_STRING'));
    $database = $mongoClient->appFacilitaDb;
    $collection = $database->selectCollection('cardapio');

    session_start();
    if (!isset($_SESSION['cardapio'])) {
        $_SESSION['cardapio'] = [
            'Dia1' => ['diaSemana' => '', 'base' => '', 'main' => '', 'acompanhamento' => ''],
            'Dia2' => ['diaSemana' => '', 'base' => '', 'main' => '', 'acompanhamento' => ''],
            'Dia3' => ['diaSemana' => '', 'base' => '', 'main' => '', 'acompanhamento' => ''],
            'Dia4' => ['diaSemana' => '', 'base' => '', 'main' => '', 'acompanhamento' => ''],
            'Dia5' => ['diaSemana' => '', 'base' => '', 'main' => '', 'acompanhamento' => '']
        ];
    }
    
    if (isset($_POST['btnEnviar'])) {
        foreach ($_SESSION['cardapio'] as $dia => &$valores) {
            if ($valores['diaSemana'] == '' && $valores['base'] == '' && $valores['main'] == '' && $valores['acompanhamento'] == '') {
                $valores['base'] = $_POST['base'];
                $valores['main'] = $_POST['main'];
                $valores['acompanhamento'] = $_POST['acompanhamento'];
                $valores['diaSemana'] = $_POST['diaSemana'];
                break;
            }
        }
    }
    
    $cardapio = $_SESSION['cardapio'];

    if(isset($_POST['btnUpdate'])){
        $updateResult = $collection->updateOne(
            ['_id' => new \MongoDB\BSON\ObjectId('6661fd43ba1a35ef4707eeb7')],
            ['$set' => $cardapio]
        );
        
        echo 'Matched ' . $updateResult->getMatchedCount() . ' documents and modified ' . $updateResult->getModifiedCount() . ' documents.';
        session_unset();
        header("refresh:1;url=index.php");
    }
?>
<!DOCTYPE html>
<html lang='pt-br'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <link rel='stylesheet' href='./style.css'>
    <title>Cardápio-Facilita</title>
</head>
<body>
    <main id='content'>
        <h1>Cardápio Facilita</h1>
        <form action='index.php' method='post' id='form'>
            <h1 id='titulo'>Dia 1</h1>
            <label for='base'>Base:</label><br>
            <input type='text' name='base'><br>
            
            <label for='main'>Principal:</label><br>
            <input type='text' name='main'><br>
            
            
            <label for='acompanhamento'>Acompanhamento:</label><br>
            <input type='text' name='acompanhamento'><br>

            <label for='diaSemana'>Data:</label><br>
            <input type='text' placeholder='(dia da semana)(Data)' name='diaSemana'><br>
            
            <input type='submit' value='Enviar' name='btnEnviar' onclick='mudarTitulo()'/>
            <input type='submit' value='Enviar p/ o Aplicativo' name='btnUpdate' onclick='resetTitle()'/>
        </form>
    </main>
    <?php
        echo '<pre>';
        print_r($cardapio);
        echo '</pre>';
    ?>
    <script src='./script.js'></script>
</body>
</html>