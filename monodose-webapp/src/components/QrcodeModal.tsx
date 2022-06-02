import React from 'react';
import QRCode from 'qrcode.react';
import Dialog from '@mui/material/Dialog'
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

interface QrcodeModalProps {
    monodoseID?: string
    isModalOpen: boolean
    handleClose: () => void
}


const QrcodeModal: React.FC<QrcodeModalProps> = ({ monodoseID, isModalOpen, handleClose }) => {


    function qr_urlImg(idQr: string) {
        var canvas = document.getElementById(idQr) as HTMLCanvasElement;

        return canvas.toDataURL("image/png");
    }


    function download_qr(idQr: string) {
        var img = qr_urlImg(idQr);
        var link = document.createElement('a');
        link.download = idQr + ".png";
        link.href = img;
        link.click();
    }


    return (
        <Dialog open={isModalOpen}>
            <div>
                <div>
                    <p>QR Code Parent</p>
                    <QRCode
                        id="QRCodeParent"
                        size={100}
                        value={"http://localhost:3000/form?id=" + monodoseID}
                    />
                    <Button
                        startIcon={<SaveIcon />}
                        variant="contained"
                        onClick={() => download_qr("QRCodeParent")}
                    >
                        Télécharger QR Parent
                    </Button>
                </div>
                <div>
                    <p>Qr Code Enfant</p>
                    <QRCode
                        id="QRCodeEnfant"
                        size={100}
                        value={"http://localhost:3000?id=" + monodoseID}
                    />
                    <Button
                        startIcon={<SaveIcon />}
                        onClick={() => download_qr("QRCodeEnfant")}
                        variant="contained"
                    >
                        Télécharger QR Enfant
                    </Button>
                </div>
            </div>
            <Button
                variant="contained"
            >
                OK
            </Button>
        </Dialog>
    )
}

export default QrcodeModal;