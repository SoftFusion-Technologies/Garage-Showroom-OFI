import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Importa tu imagen de logo
import Logo from '../logo.png'
const VentasPDF = ({ ventas, diasDeLaSemana }) => {

    const styles = StyleSheet.create({
        page: {
            padding: 30,
            position: 'relative',
            paddingBottom: 60,
        },
        section: {
            paddingBottom: 15,
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
            paddingBottom: 15,
            textAlign: 'left',
        },
        title: {
            fontSize: 24,
            textAlign: 'center',
            paddingBottom: 15,
            // Añadir subrayado
            borderBottomColor: 'black',
            borderBottomWidth: 1,
        },
        logoTopLeft: {
            position: 'absolute',
            top: 0,
            left: 0,
        },
        logoBottomRight: {
            position: 'absolute',
            bottom: 0,
            right: 0,
        },

        titleSoft: {
            fontSize: 24,
            textAlign: 'center',
            paddingBottom: 15,
            // Añadir subrayado
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            position: 'absolute',
            bottom: 10,
            right: 200,
        },
        titleSoftIg: {
            fontSize: 16,
            textAlign: 'center',
            paddingBottom: 20,

            // Añadir subrayado
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            position: 'absolute',
            bottom: 30,
            right: 200,
        },
        // Estilo para el logo con tamaño de 300px
        logo: {
            width: 100,
            height: 'auto', // Para mantener la proporción de aspecto
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

                {/* Agregar el logo en la esquina inferior derecha */}
                <View style={styles.logoBottomRight}>
                    <Image src={Logo} style={[styles.logo]} />
                </View>

                <Text style={styles.title}>Reporte de Ventas</Text>
                <Text style={styles.header}>Fecha del Reporte: {new Date().toLocaleDateString()}</Text>

                <Text style={styles.titleSoft}>SOFT - FUSION</Text>

                <Text style={styles.titleSoftIg}>@softfusiontechnologies</Text>

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
