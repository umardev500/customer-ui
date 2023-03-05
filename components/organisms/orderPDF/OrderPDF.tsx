import { Document, Page, Text, View } from '@react-pdf/renderer'
import React from 'react'

interface Props {
    productName: string
    vaNumber: string
    bank: string
    total: string
    exp: string
    status: string
}

export const OrderPDF: React.FC<Props> = ({ productName, vaNumber, bank, total, exp, status }) => {
    return (
        <Document>
            <Page size={'A6'}>
                <View style={{ display: 'flex', margin: 16, borderBottom: 1, paddingBottom: 12, borderColor: '#e5e7eb' }}>
                    <Text style={{ fontSize: 14, fontWeight: 'semibold', color: '#374151' }}>{productName}</Text>
                </View>
                <View style={{ display: 'flex', marginBottom: 16, marginLeft: 16, marginRight: 16 }}>
                    <Text style={{ fontSize: 12, color: '#374151', paddingBottom: 8 }}>Rincian Pembayaran:</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                        <Text style={{ fontSize: 12, color: '#374151' }}>Kode Transfer</Text>
                        <Text style={{ fontSize: 12, color: '#6b7280' }}>{vaNumber}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                        <Text style={{ fontSize: 12, color: '#374151' }}>Pembayaran:</Text>
                        <Text style={{ fontSize: 12, color: '#6b7280' }}>Bank Transfer</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                        <Text style={{ fontSize: 12, color: '#374151' }}>Bank:</Text>
                        <Text style={{ fontSize: 12, color: '#6b7280' }}>{bank.toUpperCase()}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                        <Text style={{ fontSize: 12, color: '#374151' }}>Jumlah:</Text>
                        <Text style={{ fontSize: 12, color: '#6b7280' }}>{total}</Text>
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 10,
                            marginTop: 5,
                            borderTop: 0.5,
                            paddingTop: 12,
                            borderColor: '#e5e7eb',
                        }}
                    >
                        <Text style={{ fontSize: 12, color: '#374151' }}>Status:</Text>
                        <Text style={{ fontSize: 12, color: '#6b7280' }}>{status}</Text>
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 10,
                            marginTop: 5,
                            borderTop: 0.5,
                            paddingTop: 12,
                            borderColor: '#e5e7eb',
                        }}
                    >
                        {status.toLocaleLowerCase() === 'pending' ? (
                            <>
                                <Text style={{ fontSize: 12, color: '#374151' }}>Lunasi Sebelum:</Text>
                                <Text style={{ fontSize: 12, color: '#6b7280' }}>{exp}</Text>
                            </>
                        ) : null}
                    </View>
                </View>
            </Page>
        </Document>
    )
}
