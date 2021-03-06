import React, { Component } from 'react';

class MemeGenerator extends Component {
	constructor() {
		super();
		this.state = {
			topText: '',
			bottomText: '',
			randomImg: 'http://i.imgflip.com/1bij.jpg',
			allMemeImgs: [],
			savedMeme: {
				savedTopText: '',
				savedBottomText: '',
				savedRandomImg: '',
			},
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		fetch('https://api.imgflip.com/get_memes')
			.then((response) => response.json())
			.then((response) => {
				const { memes } = response.data;
				this.setState({ allMemeImgs: memes });
			});
	}

	handleClick = (event) => {
		event.preventDefault();
		let newImg =
			this.state.allMemeImgs[
				Math.floor(Math.random() * this.state.allMemeImgs.length)
			].url;

		this.setState({ randomImg: newImg });
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	handleMemeReset = (event) => {
		console.log('clicked');
		this.setState({
			savedMeme: {
				savedTopText: this.state.topText,
				savedBottomText: this.state.bottomText,
				savedRandomImg: this.state.randomImg,
			},
		});
	};

	/**
	 * Create a method that, when the "Gen" button is clicked, chooses one of the
	 * memes from our `allMemeImgs` array at random and makes it so that is the
	 * meme image that shows up in the bottom portion of our meme generator site
	 */

	render() {
		return (
			<div>
				<form className="meme-form">
					<input
						type="text"
						name="topText"
						placeholder="Top Text"
						value={this.state.topText}
						onChange={this.handleChange}
					/>
					<input
						type="text"
						name="bottomText"
						placeholder="Bottom Text"
						value={this.state.bottomText}
						onChange={this.handleChange}
					/>

					<button onClick={this.handleClick}>Generate New Image</button>

					{/*
once a meme is create this button will save it as a image.
*/}
					<button onClick={this.handleMemeReset}>Reset</button>
				</form>

				<div className="meme">
					<img src={this.state.randomImg} alt="" />
					<h2 className="top">{this.state.topText}</h2>
					<h2 className="bottom">{this.state.bottomText} </h2>
				</div>
			</div>
		);
	}
}

export default MemeGenerator;
