import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import logo from "./Prestashop-logo-vector.png";
import { FormattedNumber } from "../FormattedNumber/FormattedNumber";

// Styles for the invoice
const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 30,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    column: {
        width: "48%", // Adjust width as needed
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    text: {
        fontSize: 12,
        marginBottom: 5,
    },
    tableHeader: {
        borderBottomColor: "#000",
        borderBottomWidth: 1,
        flexDirection: "row",
        fontStyle: "bold",
    },
    tableRow: {
        flexDirection: "row",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        paddingBottom: 5,
        paddingTop: 5,
    },
    tableCell: {
        width: "25%", // Adjust width as needed
        fontSize: 10,
        padding: 5,
        textAlign: "left",
    },
    tableCell_2: {
        width: "25%", // Adjust width as needed
        fontSize: 10,
        padding: 8,
        textAlign: "right",
    },
    tableCell_2_c: {
        width: "25%", // Adjust width as needed
        fontSize: 10,
        padding: 8,
        textAlign: "right",
    },
    tableCell_2_mr: {
        width: "25%", // Adjust width as needed
        fontSize: 10,
        padding: 10,
        textAlign: "right",
    },
    totalAmount: {
        marginTop: 20,
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "right",
    },
    logo: {
        width: 200,
        marginBottom: 30,
    },
    footer: {
        position: "absolute",
        bottom: 0,
        left: 40,
        right: 40,
        textAlign: "center",
        fontSize: 8,
        lineHeight: 1.4,
    },
});

const formatCurrency = (value) => value.toLocaleString("ar-MA", { style: "currency", currency: "Dhs" });

// Invoice component
const InvoicePDF = ({ invoiceData, orderDateFormatted }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Image style={styles.logo} src={logo} />
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.title}>Invoice</Text>
                        <Text style={styles.text}>Invoice Number: #{invoiceData.orderNumber?.toString().padStart(6, "0")}</Text>
                        <Text style={styles.text}>Date: {orderDateFormatted}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.title}>Customer Information</Text>
                        <Text style={styles.text}>
                            Customer Name: {invoiceData.customerFirstName} {invoiceData.customerLastName}
                        </Text>
                        <Text style={styles.text}>Email: {invoiceData.customerEmail}</Text>
                    </View>
                </View>

                <View style={(styles.section, { marginTop: "50" })}>
                    <Text style={styles.title}>Invoice Items</Text>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableCell}>Item Name</Text>
                        <Text style={styles.tableCell_2_c}>Quantity</Text>
                        <Text style={styles.tableCell_2}>Price</Text>
                        <Text style={styles.tableCell_2}>Total</Text>
                    </View>
                    {invoiceData?.orderItems?.map((item, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.tableCell}>
                                {item.itemName} {"\n"} {item.itemOptions}
                            </Text>
                            <Text style={styles.tableCell_2_mr}>{item.quantity}</Text>
                            <Text style={styles.tableCell_2}>{formatCurrency(item.unitPrice)}</Text>
                            <Text style={styles.tableCell_2}>{formatCurrency(item.totalPrice)}</Text>
                        </View>
                    ))}
                    <Text style={styles.totalAmount}>Subtotal: {formatCurrency(invoiceData.cartSubTotalPrice)}</Text>
                    <Text style={styles.totalAmount}>
                        Tax {`${(invoiceData.tvaApplied * 100).toFixed(0)} %`}: {formatCurrency(invoiceData.cartTotalPrice - invoiceData.cartSubTotalPrice)}
                    </Text>
                    <Text style={styles.totalAmount}>Total Amount: {formatCurrency(invoiceData.cartTotalPrice)}</Text>
                </View>
                <View style={styles.footer}>
                    <Text style={{ fontSize: 10 }}>Our Support: email@example.com, Contact Number: +000 00 000 000</Text>
                    <Text style={{ fontSize: 10 }}>Tax Number: 545645454654, Company Name: E-Shop Maroc</Text>
                </View>
            </View>
        </Page>
    </Document>
);

export default InvoicePDF;
