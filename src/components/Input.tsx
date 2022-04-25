// Input.js
import React from 'react'
import styled from 'styled-components/native'
import {Dimensions, useWindowDimensions} from 'react-native'
import PropTypes from 'prop-types'

const Input = ({placeholder, value, onChangeText, onSubmitEditing, onBlur}:any) => {
	// const width = Dimensions.get('window').width
	const width = useWindowDimensions().width
	return <StyledInput width={width} placeholder={placeholder} maxLength={50} autoCapitalize="none" autoCorrect={false} returnKeyType="done" keyboardAppearance="dark" value={value} onChangeText={onChangeText} onSubmitEditing={onSubmitEditing} onBlur={onBlur} />
}

const StyledInput = styled.TextInput.attrs(({theme}:any) => ({placeholderTextColor: theme.main}))`
	width: ${({width}:any) => width - 40}px;
	height: 60px;
	margin: 3px 0;
	padding: 15px 20px;
	border-radius: 10px;
	font-size: 25px;
	background-color: ${({theme}:any) => theme.itemBackground};
	color: ${({theme}:any) => theme.text};
`

Input.propTypes = {
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	onChangeText: PropTypes.func.isRequired,
	onSubmitEditing: PropTypes.func.isRequired,
	onBlur: PropTypes.func
}

export default Input
