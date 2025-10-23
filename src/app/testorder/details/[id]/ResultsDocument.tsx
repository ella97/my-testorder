import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";
import { calculateAge, formatDate } from "@/lib/utils";
import { patient_document } from "@/data";

Font.register({
  family: "Inter",
  src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZg.ttf",
  fontStyle: "normal",
});

const pageStyles = StyleSheet.create({
  name: {
    fontSize: 12,
    fontFamily: "Inter",
    color: "#343a40",
  },
  body: {
    paddingBottom: 20,
    paddingTop: 20,
  },
});

const headerStyles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginHorizontal: 20,
    borderBottomWidth: 5,
    borderBottomColor: "#6c757d",
    borderBottomStyle: "solid",
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  title: {
    fontSize: 25,
    color: "#069567",
    fontFamily: "Inter",
  },
  tagline: {
    fontSize: 11,
    fontFamily: "Inter",
  },
  address: {
    fontSize: 9,
    fontFamily: "Inter",
    marginBottom: 5,
  },
  labTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  logoDimensions: {
    height: 40,
    width: 40,
  },
  contactStyles: {
    fontSize: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
});
const subheaderStyles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 20,
    fontSize: "11",
    borderBottomWidth: 1,
    borderBottomColor: "#adb5bd",
    borderBottomStyle: "dotted",
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  patientWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  titles: {
    fontSize: 12,
    fontFamily: "Inter",
    textTransform: "uppercase",
  },
  normalText: {
    fontSize: 10,
    fontFamily: "Inter",
  },
  codeDimensions: {
    height: 70,
    width: 70,
    padding: -10,
  },
  barDimensions: {
    height: 40,
  },
  horizontalDivider: {
    borderRight: 1,
    borderRightColor: "#ced4da",
    paddingHorizontal: 5,
    height: 80,
  },
  specimenWrapper: {
    marginLeft: 2,
  },
});
const departmentTitle = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#adb5bd",
    borderBottomStyle: "dotted",
  },
  title: {
    fontSize: 17,
    fontFamily: "Inter",
    paddingVertical: 5,
  },
});

const resultTableStyle = StyleSheet.create({
  container: {
    marginTop: 5,
    marginHorizontal: 20,
  },
});
const tableHeadStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "#ced4da",
    backgroundColor: "#e9ecef",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    marginTop: 5,
    textAlign: "center",
    flexGrow: 1,
    textTransform: "uppercase",
    fontSize: 10,
  },
  investigation: {
    width: "20%",
  },
  other: {
    width: "16%",
  },
  row: {
    flexDirection: "row",
    borderBottomColor: "#e9ecef",
    borderBottomWidth: 1,
    alignItems: "center",
    textAlign: "left",
    height: 24,
  },
  rowInvestigation: {
    width: "25%",
    textAlign: "left",
    fontSize: 10,
  },
  otherRow: {
    width: "15%",
    textAlign: "center",
    fontSize: 10,
  },
});

const noteStyles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#adb5bd",
    borderBottomStyle: "dashed",
  },
  wrapper: {
    paddingVertical: 5,
  },
  title: {
    fontSize: 12,
    textDecoration: "underline",
    textDecorationStyle: "solid",
    fontFamily: "Inter",
  },
  notes: {
    color: "#FFFFFF",
    fontSize: 11,
    fontFamily: "Inter",
  },
});
const reportEndStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 11,
    fontFamily: "Inter",
  },
});

const signatureStyles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#adb5bd",
    borderBottomStyle: "solid",
  },
  wrapper: {
    paddingVertical: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 15,
    fontFamily: "Inter",
  },
  subTitle: {
    fontSize: 10,
    fontFamily: "Inter",
  },
});
const footerStyles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 10,
    fontFamily: "Inter",
    color: "#bfc0c0",
  },
});
const highlighter = (flag: any) => {
  if (flag === "L") {
    return "#3a86ff";
  } else if (flag === "H") {
    return "#e26d5c";
  } else if (flag === "N") {
    return "#43aa8b";
  } else {
    return "#343a40";
  }
};

const ResultTable = ({ data, test }: any) => {
  return (
    <View>
      <Text> 1. {test} </Text>
      <View style={tableHeadStyles.container}>
        <Text style={tableHeadStyles.investigation}>Investigation</Text>
        <Text style={tableHeadStyles.other}>Value</Text>
        <Text style={tableHeadStyles.other}>Unit</Text>
        <Text style={tableHeadStyles.other}>Ref Range</Text>
        <Text style={tableHeadStyles.other}>ABN Flags</Text>
        <Text style={tableHeadStyles.other}>OBS Status</Text>
      </View>
      <View>
        {data.map((item: any) => (
          <View
            style={{ color: highlighter(item.abnormal_flag) }}
            key={item.set_id}
          >
            <View style={tableHeadStyles.row}>
              <Text style={tableHeadStyles.rowInvestigation}>
                {item.test_name}
              </Text>
              <Text style={tableHeadStyles.otherRow}>{item.test_result}</Text>
              <Text style={tableHeadStyles.otherRow}>{item.unit}</Text>
              <Text style={tableHeadStyles.otherRow}>
                {item.reference_range}
              </Text>
              <Text style={tableHeadStyles.otherRow}>{item.abnormal_flag}</Text>
              <Text style={tableHeadStyles.otherRow}>{item.result_status}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const ResultsDocument = ({ results }: any) => {
  const patientDocument = patient_document;
  const canvas = document.createElement("canvas");
  QRCode.toCanvas(canvas, patientDocument.id);
  const qr = canvas.toDataURL();

  JsBarcode(canvas, patientDocument.order_number);
  const barcode = canvas.toDataURL();

  const today = new Date();

  return (
    <Document title="Result Report">
      <Page size="A4" orientation="portrait" style={pageStyles.body} wrap>
        <View style={pageStyles.name}>
          {/*Header Section*/}
          <View style={headerStyles.container}>
            <View style={headerStyles.wrapper}>
              <View>
                <view style={headerStyles.labTitle}>
                  {/* <Image
                    style={headerStyles.logoDimensions}
                    src={"/app_logo.png"}
                  /> */}
                  <view>
                    <Text style={headerStyles.title}>AMT LABORATORIES</Text>
                    <Text style={headerStyles.tagline}>
                      ACCURATE • CARING • INSTANT{" "}
                    </Text>
                  </view>
                </view>
              </View>
              <View style={headerStyles.contactStyles}>
                <Text>Phone: +255 912 345 678 </Text>
                <Text>Phone 2: +255 912 345 678 </Text>
                <Text>Mail: support@jambolabs.co.tz </Text>
              </View>
            </View>
            <Text style={headerStyles.address}>
              P.O.Box 10585, PANGANI, KIBAHA
            </Text>
          </View>
          <View style={subheaderStyles.container}>
            <View style={subheaderStyles.wrapper}>
              <View style={subheaderStyles.patientWrapper}>
                <View>
                  <Text style={subheaderStyles.titles}>
                    {patientDocument?.patient_name ?? ""}
                  </Text>
                  <view style={subheaderStyles.normalText}>
                    <Text>Age : {patientDocument.age} YRS</Text>
                    <Text>Gender : {patientDocument.gender ?? ""}</Text>
                    <Text>Patient ID : {patientDocument.id ?? ""}</Text>
                    <Text>Address : {patientDocument.address ?? ""}</Text>
                  </view>
                </View>
                <View style={subheaderStyles.horizontalDivider} />
                <View style={subheaderStyles.codeDimensions}>
                  {/* <Image src={qr} /> */}
                </View>
              </View>
              <View>
                <Text style={subheaderStyles.titles}>
                  Sample collected at:{" "}
                </Text>
                <View style={subheaderStyles.normalText}>
                  <Text>
                    {patientDocument.sample_information.section ?? ""}
                  </Text>
                  <Text>
                    Lab Code: {patientDocument.sample_information.code}
                  </Text>
                  <Text>{patientDocument.sample_information.address} </Text>
                  <Text>
                    REQ BY : {patientDocument.sample_information.doctor ?? ""}{" "}
                  </Text>
                </View>
              </View>
              <View style={subheaderStyles.horizontalDivider} />
              <View style={subheaderStyles.specimenWrapper}>
                {/* <Image style={subheaderStyles.barDimensions} src={barcode} /> */}
                <View style={subheaderStyles.normalText}>
                  <Text>
                    COL:{" "}
                    {patientDocument.sample_information.collection_date ?? ""}
                  </Text>
                  <Text>
                    ACC:{" "}
                    {patientDocument.sample_information.received_date ?? ""}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={departmentTitle.container}>
            <Text style={departmentTitle.title}>
              {patientDocument.department}
            </Text>
          </View>
          <View style={resultTableStyle.container}>
            <ResultTable
              data={patientDocument.results}
              test={patientDocument.test ?? ""}
            />
          </View>
          <View style={noteStyles.container}>
            <Text style={noteStyles.title}>Notes: </Text>
            <View style={noteStyles.wrapper}>
              <Text style={noteStyles.notes}>{patientDocument.notes}</Text>
            </View>
          </View>
          <View>
            {/*  End of Report */}
            <View style={reportEndStyles.container}>
              <Text style={reportEndStyles.title}>***End of Report***</Text>
            </View>
            {/*  Signatures */}
            <View style={signatureStyles.container}>
              <View style={signatureStyles.wrapper}>
                <View>
                  <Text style={signatureStyles.title}>
                    {patientDocument.authorized}
                  </Text>
                  <Text style={signatureStyles.subTitle}>
                    ({patientDocument.author_title})
                  </Text>
                </View>
                <View>
                  <Text style={signatureStyles.title}>
                    {patientDocument.doctor}
                  </Text>
                  <Text style={signatureStyles.subTitle}>
                    {" "}
                    ({patientDocument.doctor_title})
                  </Text>
                </View>
              </View>
            </View>
            <View style={footerStyles.container}>
              <Text style={footerStyles.title} fixed>
                {" "}
                Generated : {today.toISOString()}
              </Text>
              <Text
                style={footerStyles.title}
                render={({ pageNumber, totalPages }) =>
                  `Page ${pageNumber} of ${totalPages}`
                }
                fixed
              />
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ResultsDocument;
