import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "@styled-icons/bootstrap";
// import { formatDate, formatHour } from "@/utils/date-utils";
import Image from "next/image";
// import { useGetRapportQuery } from "@/redux/services/rapports/api";

// import {
//   usePDF,
//   Page,
//   Text,
//   View,
//   Document,
//   Image as PDFImage,
//   StyleSheet,
//   PDFDownloadLink,
// } from "@react-pdf/renderer";

interface Props {
  rapportId: string;
  open: boolean;
  onOpenChange: () => void;
}

const ShowRapportModal = ({ rapportId, open, onOpenChange }: Props) => {
  // const { data: rapport } = useGetRapportQuery(rapportId);

  // if (!rapport) return null;

  // const rapportName =
  //   rapport.name +
  //   "_" +
  //   formatDate(rapport.createdAt) +
  //   "_" +
  //   formatHour(rapport.createdAt) +
  //   ".pdf";

  // const download = async (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   e.preventDefault();
  //   const response = await fetch(rapport.fileUrl);
  //   const blob = await response.blob();
  //   const blobUrl = window.URL.createObjectURL(blob);
  //   const link = document.createElement("a");
  //   link.href = blobUrl;
  //   link.download = rapportName;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  //   window.URL.revokeObjectURL(blobUrl);
  // };

  // const MyDoc = () => {
  //   return (
  //     <Document>
  //       <Page>
  //         <PDFImage src={rapport.fileUrl !== null && rapport.fileUrl} />
  //       </Page>
  //     </Document>
  //   );
  // };

  const rapport = {
    name: "Test",
    fileUrl: "https://www.w3schools.com/images/w3schools_green.jpg",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-center">{rapport.name}</DialogTitle>
          <Image
            src={rapport.fileUrl}
            alt="image"
            width={400}
            height={400}
            className="flex self-center pt-5"
          />
        </DialogHeader>
        <DialogFooter className="pt-4">
          {/* <PDFDownloadLink
            className="mx-auto"
            document={<MyDoc />}
            fileName={rapportName}
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                <span>Ladedokument...</span>
              ) : (
                <Button className="border border-gray-600 bg-white hover:bg-gray-100 px-4 text-black py-2 rounded-lg flex gap-4 items-center">
                  <Download size={20} />
                  <span>Herunterladen</span>
                </Button>
              )
            }
          </PDFDownloadLink> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShowRapportModal;
