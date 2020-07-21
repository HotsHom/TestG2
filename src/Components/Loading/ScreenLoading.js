import {observer} from 'mobx-react';
import {Text, View, ActivityIndicator} from 'react-native';
import React from 'react';

import { defaultStyles } from '../../styles/screenDefaultStyles';

export default ScreenLoading = observer(() => {
    return (
        <View style={defaultStyles.screen} >
            <Text style={defaultStyles.centerText} >Загрузка</Text>
            <ActivityIndicator size="large" />
        </View>
    )
})
