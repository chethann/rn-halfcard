'use strict'
import React, { Component } from 'react'
import {
	Animated,
	Modal,
	Text,
	TouchableHighlight,
	Dimensions,
	StyleSheet,
	View } from 'react-native'

class Halfcard extends Component {

	constructor(props) {
    super(props)
		let {height} = Dimensions.get('window')
    this.state = {
			modalVisible: false,
			position: new Animated.Value((-1 * height))
		}
  }

	render() {
		let height_style = this.props.height ? {height: this.props.height } : {}
    return (
      <View>
        <Modal
					transparent={true}
          visible={this.state.modalVisible}
					onShow={this.props.onShow}
					onRequestClose={this.close.bind(this)}>

         <View style={{flex: 1}}>
				 	<TouchableHighlight
						style={styles.overlay}
						underlayColor='rgba(0,0,0,0.4)'
						onPress = {this.close.bind(this)}>
							<View/>
					</TouchableHighlight>

					<Animated.View style = {[styles.content, height_style, {bottom: this.state.position, }]}>
						{this.props.children}
					</Animated.View>
				 </View>

				</Modal>
      </View>
    )
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible})
  }

	animate_up() {
		let animation_duration = this.props.slideDuration || 300
		Animated.timing(
			this.state.position,
			{
				toValue: 0,
				duration: animation_duration
			},
		).start()
	}

	animate_down() {
		let animation_duration = this.props.slideDuration || 300
		let {height} = Dimensions.get('window')
		let slide_down_to = height * -1
		Animated.timing(
			this.state.position,
			{
				toValue: slide_down_to,
				duration: animation_duration
			},
		).start()
	}

	close() {
		let animation_duration = this.props.slideDuration || 300
		this.animate_down()
		setTimeout(() => {
			this.setModalVisible(false)
		}, animation_duration)
		this.props.onClose && this.props.onClose()
	}

	show() {
		this.setModalVisible(true)
		this.animate_up()
	}
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.4)',
	},

	content: {
		position: 'absolute',
		left:0,
		right:0,
	},
})

export default Halfcard
