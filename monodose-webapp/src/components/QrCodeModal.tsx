import React from "react";
import QRCode from "qrcode.react";
import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import {
  Document,
  Page,
  Image,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

interface QrcodeModalProps {
  monodoseID?: number;
  isModalOpen: boolean;
  handleClose: () => void;
}

const QrcodeModal: React.FC<QrcodeModalProps> = ({
  monodoseID,
  isModalOpen,
  handleClose,
}) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
    },

    section: {
      flexDirection: "row",
      flexWrap: "wrap",
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

  const DocPDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {Array(250)
            .fill(1)
            .map(() => (
              <Image
                style={styles.imageEnfant}
                source={() => qr_urlImg("QRCodeEnfant")}
              />
            ))}
          <Image
            style={styles.imageParent}
            source={() => qr_urlImg("QRCodeParent")}
          />
        </View>
      </Page>
    </Document>
  );

  function qr_urlImg(idQr: string) {
    var canvas = document.getElementById(idQr) as HTMLCanvasElement;
    return canvas.toDataURL("image/png");
  }

  return (
    <Dialog open={isModalOpen} onClose={handleClose}>
      <div>
        <div>
          <div className="qr-codes" style={{ display: "none" }}>
            <QRCode
              id="QRCodeParent"
              size={50}
              value={"http://localhost:3000/form?id=" + monodoseID}
            />
            <QRCode
              id="QRCodeEnfant"
              size={50}
              value={"http://localhost:3000?id=" + monodoseID}
            />
          </div>
          <PDFDownloadLink
            document={<DocPDF />}
            fileName={"qrcodes-" + monodoseID + ".pdf"}
          >
            <Button id="BtnPDF">Télécharger le PDF</Button>
          </PDFDownloadLink>
        </div>
      </div>
    </Dialog>
  );
};

export default QrcodeModal;
