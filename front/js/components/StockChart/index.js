import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ReactFC from 'react-fusioncharts';
import fusioncharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import PropTypes from 'prop-types';
import { setCurrPrice } from '../../actions/tradeActions';

const username = '3d66283476b5f3bfba55a40f7b30ec6c';
const password = '9320fc2b49b41cdbe5a7672d3e5563ec';
const url = 'https://api.intrinio.com/prices?identifier=';

@connect((store) => {
	return {
		balance: store.user.balance
	};
})
export default class StockChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stockList: '',
			data: {}
		};
		console.log(this.props);
	}

	componentWillMount() {
		this.getStock();
	}

	getStock() {
		console.log(url + this.props.stockID);
		axios.get(url + this.props.stockID, {
			auth: {
				username: username,
				password: password
			}
		})
		.then((response) => {
			console.log(response);
			this.props.dispatch(setCurrPrice(this.props.stockID, response.data.data[0].open));
			const category = response.data.data.reverse().map((e) => {
				return {'label': e.date.replace('2017-', '')};
			});
			let categories = [];
			categories.push({'category': category});
			// console.log(categories);
			const data = response.data.data.reverse().map((e) => {
				return {'value': e.open.toString()};
			});
			let dataset = [];
			let obj = {'seriesname': 'Price(In USD)','renderas': 'area', 'showvalues': '0', 'data':data };
			dataset.push(obj);
			this.setState({
				data: {'charts': {
					'caption': 'Apple Inc. (AAPL)',
					'subcaption': 'NasdaqGS - NasdaqGS Delayed Price.',
					'xaxisname': 'Date',
					'yaxisname': 'Amount (In USD)',
					'numberprefix': '$',
					'theme': 'ocean'
				}, 'categories': categories, 'dataset':dataset}
			});
		})
		.catch((error) => {
			console.log(error);
		});
	}

	render() {
		charts(fusioncharts);
		var props_multi_chart = {
			id: 'multi_chart',
			type: 'mscombi2d',
			width: '100%',
			height: '20%',
			dataFormat: 'json',
			dataSource: this.state.data
		};
		return (
			<div id='chart-container'>
				<ReactFC {...props_multi_chart} />
			</div>
		);
	}
}

StockChart.propTypes = {
	stockID: PropTypes.string,
	dispatch: PropTypes.function
};
