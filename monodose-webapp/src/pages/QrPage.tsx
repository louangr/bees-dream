import React, { useState } from 'react';
import "../bufferprocess"
import QRCode from 'qrcode.react';
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SharedStyle from '../shared/styles';
import '../assets/info/styles/Qrcode.css';
import { Document, Page, Text, Image, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';



const QrPage: React.FC = () => {

    const [QrValue, setQrValue] = useState('');
    const [QrVisibility, setQrVisibility] = useState(false);

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
        },

        section: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: "center",
        },
        imageParent: {

            marginTop: 10,
            marginBottom: 0,
            marginLeft: 5,
            marginRight: 5,
            width: 60,
            height: 60,
        },
        imageEnfant: {
            marginTop: 15,
            marginBottom: 15,
            marginHorizontal: 10,
            width: 50,
            height: 50,
        },
    });

    const DocPDF = () => (<Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Image style={styles.imageParent}

                    source={() => qr_urlImg("QRCodeParent")} />

                {

                    Array(159).fill(1).map(() => (

                        <Image style={styles.imageEnfant}

                            source={() => qr_urlImg("QRCodeEnfant")} />

                    ))
                }
            </View>
        </Page>
    </Document>);

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

    function download_qr_test() {
        var btn = document.getElementById("test") as HTMLButtonElement;
        btn.click();
    }

    return (

        <div style={SharedStyle.container}>
            <Button
                onClick={() => download_qr_test()}
            >
                test
            </Button>
            <div style={SharedStyle.formContainer}>
                <Button
                    startIcon={<QrCode2Icon />}
                    variant="contained"
                    onClick={() => { /*setQrValue('{site}/monodose/{id}');*/setQrValue('google.com'); setQrVisibility(true); }}
                >
                    Générer QR
                </Button>
                <div style={{ visibility: QrVisibility ? "visible" : "hidden" }}>
                    <div className='qrcode' >
                        <p>QR Code Parent</p>
                        <QRCode
                            id="QRCodeParent"
                            size={100}
                            value="google.fr"
                        />
                        <Button
                            startIcon={<SaveIcon />}
                            variant="contained"
                            style={{ visibility: QrVisibility ? "visible" : "hidden" }}
                        >
                            Télécharger QR Parent
                        </Button>
                    </div>
                    <div className='qrcode'>
                        <p>Qr Code Enfant</p>
                        <QRCode
                            id="QRCodeEnfant"
                            size={50}
                            value={QrValue}
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


                <PDFDownloadLink document={<DocPDF />} fileName="qrcodes.pdf">
                    <Button id="test"
                        startIcon={<PictureAsPdfIcon />}
                        variant="contained"
                        style={{ visibility: QrVisibility ? "visible" : "hidden" }}
                    >
                        Télécharger en PDF
                    </Button>
                </PDFDownloadLink>
            </div>

        </div >
    );
}

export default QrPage;



