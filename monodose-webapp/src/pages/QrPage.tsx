import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import SharedStyle from '../shared/styles';
import '../assets/info/styles/Qrcode.css'

const QrPage: React.FC = () => {
    const [QrValue, setQrValue] = useState('');
    const [QrVisibility, setQrVisibility] = useState(false);

    const qrcode = <QRCode style={{ visibility: QrVisibility ? "visible" : "hidden" }} id="QRCodeID" size={100} value={QrValue} />;
    console.log(qrcode)



    function download_qr() {
        var canvas = document.getElementById("QRCodeID") as HTMLCanvasElement;
        var img = canvas.toDataURL("image/png");
        var link = document.createElement('a');
        link.download = "QR_Code.png";
        link.href = img;
        link.click();
    }

    return (
        <div style={SharedStyle.container}>
            <div style={SharedStyle.formContainer}>
                <Button
                    startIcon={<QrCode2Icon />}
                    variant="contained"
                    onClick={() => { /*setQrValue('{site}/monodose/{id}');*/setQrValue('google.com'); setQrVisibility(true); }}
                >
                    Générer QR
                </Button>

                {qrcode}

                <Button
                    startIcon={<SaveIcon />}
                    onClick={download_qr} variant="contained"
                    style={{ visibility: QrVisibility ? "visible" : "hidden" }}
                >
                    Télécharger QR
                </Button>
            </div>

        </div >
    );
}

export default QrPage;



