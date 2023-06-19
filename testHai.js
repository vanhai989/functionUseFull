import { View, StyleSheet, Animated, Dimensions, Easing } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

let widthScreen = Dimensions.get('window').width;
let heightScreen = Dimensions.get('window').height;

//config animation
const heightShow = 0
const heightHide = heightScreen
const zIndexShow = 2
const zIndexHide = 1
const scaleViewValue = 0.7
const debounce = 100
const timerContainerValue = 100
const durationScale = 900
const durationTransitionShow = 800
const durationTransitionHide = 500
const timerTransitionHideValue = 700

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timeoutId);
    }, [value]);

    return debouncedValue;
}

const TransitionTest = ({EnglishView, ArabicView, targetAnimation}) => {
    const timerContainer = useRef(null);
    const timerScale = useRef(null);
    const animationTransitionShow = useRef(new Animated.Value(0)).current;
    const animationTransitionHide = useRef(new Animated.Value(0)).current;
    const animationScale = useRef(new Animated.Value(0)).current;
    const animationScaleShow = useRef(new Animated.Value(1)).current;

    const [zIndexs, setZIndexs] = useState({ viewA: zIndexShow, viewB: zIndexHide })
    const isStartAnimation = useDebounce(targetAnimation, debounce)

    const startTransition = (valueTransition) => {
        timerContainer.current = setTimeout(() => {
            setViewActive()
            Animated.parallel([
                Animated.timing(animationTransitionShow, {
                    toValue: valueTransition,
                    duration: durationTransitionShow,
                    useNativeDriver: false,
                }),
                Animated.timing(animationScale, {
                    toValue: valueTransition,
                    duration: durationScale,
                    useNativeDriver: false,
                    easing: Easing.ease
                }),
            ]).start(() => {})
            timerScale.current = setTimeout(() => {
                Animated.timing(animationTransitionHide, {
                    toValue: valueTransition,
                    duration: durationTransitionHide,
                    useNativeDriver: false,
                }).start(() => {
                    // set enable btn here
                })
            }, timerTransitionHideValue)
        }, timerContainerValue)
    }

    useEffect(() => {
        clearTimer();
        if (targetAnimation == null) return
        startTransition(targetAnimation)
    }, [isStartAnimation])

    useEffect(() => {
        clearTimer();
        return () => {
            clearTimer()
        }
    }, [])

    const clearTimer = () => {
        if (timerContainer.current) {
            clearTimeout(timerContainer.current)
        }
        if (timerScale.current) {
            clearTimeout(timerScale.current)
        }
        timerContainer.current = null
        timerScale.current = null
    }

    const setViewActive = () => {
        setZIndexs((pre) => { return { viewA: pre.viewB, viewB: pre.viewA } })
    }

    // top show
    const topViewAShow = animationTransitionShow.interpolate({
        inputRange: [0, 1],
        outputRange: [heightShow, heightHide],
    });

    const topViewBShow = animationTransitionShow.interpolate({
        inputRange: [0, 1],
        outputRange: [heightHide, heightShow],
    });

    // top hide
    const topViewAHide = animationTransitionHide.interpolate({
        inputRange: [0, 1],
        outputRange: [heightShow, heightHide],
    });

    const topViewBHide = animationTransitionHide.interpolate({
        inputRange: [0, 1],
        outputRange: [heightHide, heightShow],
    });


    const scaleViewA = animationScale.interpolate({
        inputRange: [0, 1],
        outputRange: [1, scaleViewValue],
    });

    const scaleViewB = animationScale.interpolate({
        inputRange: [0, 1],
        outputRange: [scaleViewValue, 1],
    });

    const renderViewA = () => {

        return (
            <>
                <Animated.View
                    style={[styles.wrapView, {
                        zIndex: zIndexs.viewA,
                        top: topViewAHide,
                        transform: [{ scale: scaleViewA }],
                        display: zIndexs.viewA == 1 ? 'flex' : 'none'
                    }]}>
                    {EnglishView}
                </Animated.View>

                <Animated.View

                    style={[styles.wrapView, {
                        zIndex: zIndexs.viewA,
                        top: topViewAShow,
                        transform: [{ scale: animationScaleShow }],
                        display: zIndexs.viewA == 1 ? 'none' : 'flex'
                    }]}>
                    {EnglishView}
                </Animated.View>
            </>
        )
    }

    const renderViewB = () => {
        return (
            <>
                <Animated.View
                    style={[styles.wrapView, {
                        // backgroundColor: '#3f4661',
                        zIndex: zIndexs.viewB,
                        top: topViewBHide,
                        transform: [{ scale: scaleViewB }],
                        display: zIndexs.viewB == 1 ? 'flex' : 'none'
                    }]}>
                    {ArabicView}
                </Animated.View>

                <Animated.View

                    style={[styles.wrapView, {
                        zIndex: zIndexs.viewB,
                        top: topViewBShow,
                        display: zIndexs.viewB == 1 ? 'none' : 'flex',
                        transform: [{ scale: animationScaleShow }],
                    }]}>
                    {ArabicView}
                </Animated.View>
            </>
        )
    }

    return (
        <View style={styles.container}>
            {renderViewA()}
            {renderViewB()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'black'
    },
    wrapView: {
        position: 'absolute', width: widthScreen, height: heightScreen, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'
    },
    textStyle: {
        color: 'black'
    },
})

export default TransitionTest