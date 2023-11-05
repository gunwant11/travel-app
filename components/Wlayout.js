

import { View } from 'native-base';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';


const Layout = ({ style, children,  }) => {


    return (
        <View
            style={styles.container}
        >
                {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
})

export default Layout;