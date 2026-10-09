import { useEffect, useState } from 'react';

import AvisoDemo from './avisoDemo.jsx';
import { aoReceberEmail, estaNaVitrine, ultimoCodigoPara } from '@/services/demo/correio';
import { usuarios } from '@/services/demo/dados';

// Aviso das telas que pedem um código recebido por email.
// Dentro da vitrine do GitHub Pages o email aparece na caixa de entrada fictícia;
// rodando o app sozinho (npm start), o próprio aviso mostra o código.
/** @param {{ email: string, tipo: 'codigoConfirmacao' | 'codigoRecuperacao' }} props */
function AvisoCodigo({ email, tipo }) {
    const buscarCodigo = () =>
        ultimoCodigoPara(email) ?? usuarios.find((u) => u.email.toLowerCase() === email.trim().toLowerCase())?.[tipo];
    const [codigo, setCodigo] = useState(buscarCodigo);

    useEffect(() => aoReceberEmail(() => setCodigo(buscarCodigo())), [email]);

    if (estaNaVitrine()) {
        return <AvisoDemo>O código foi enviado para a caixa de entrada da demonstração.</AvisoDemo>;
    }
    return (
        <AvisoDemo>
            Nenhum email é enviado de verdade. {codigo ? `O código enviado para ${email} é ${codigo}.` : 'Aguardando o envio do código...'}
        </AvisoDemo>
    );
}

export default AvisoCodigo;
