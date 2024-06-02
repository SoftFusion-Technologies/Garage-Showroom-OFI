import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const VentasPDF = ({ ventas, diasDeLaSemana }) => {
    const styles = StyleSheet.create({
        page: {
            padding: 30,
        },
        section: {
            marginBottom: 20,
        },
        table: {
            display: "table",
            width: "auto",
            margin: "auto",
        },
        tableRow: {
            flexDirection: "row",
        },
        tableCol: {
            width: "33.33%",
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: '#000',
            padding: 5,
        },
        tableCell: {
            margin: "auto",
            marginTop: 5,
            fontSize: 10,
        },
        header: {
            fontSize: 18,
            marginBottom: 10,
            textAlign: 'center',
        },
    });

    const formatCurrency = (amount) => {
        return amount.toFixed(2);
    };

    const getVentasPorDia = (dia) => {
        return ventas.filter(venta => {
            const fecha = new Date(venta.fecha.split('/').reverse().join('-'));
            return fecha.toLocaleDateString('es-ES', { weekday: 'long' }) === dia.toLowerCase();
        });
    };

    return (
        <Document>
            <Page style={styles.page}>
                {diasDeLaSemana.map((dia) => (
                    <View key={dia} style={styles.section}>
                        <Text style={styles.header}>{dia.charAt(0).toUpperCase() + dia.slice(1)}</Text>
                        <View style={styles.table}>
                            <View style={styles.tableRow}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>Fecha</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>Productos</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>Total</Text>
                                </View>
                            </View>
                            {getVentasPorDia(dia).map((venta, index) => {
                                const totalVenta = venta.productos.reduce((total, product) => total + product.price, 0);
                                return (
                                    <View key={index} style={styles.tableRow}>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>{venta.fecha}</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            {venta.productos.map((product, i) => (
                                                <Text key={i} style={styles.tableCell}>
                                                    Producto: {product.name} || Precio: ${formatCurrency(product.price)}
                                                </Text>
                                            ))}
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>Total: ${formatCurrency(totalVenta)}</Text>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                ))}
            </Page>
        </Document>
    );
};

export default VentasPDF;
