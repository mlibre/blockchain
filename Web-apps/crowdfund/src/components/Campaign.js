import React, { Component } from 'react';
import { Button, Input, Table, TableRow, TableBody } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import { createContract} from './../ethereum/crowdfundingContract'
import {web3} from './../ethereum/web3'


export class Campaign extends Component
{
	ONGOING_STATE = '0'
	FAILED_STATE = '1'
	SUCCEEDED_STATE = '2'
	PAID_OUT_STATE = '3'
	
	state = {
		campaign:
		{
			name: 'N/A',
			targetAmount:0,
			totalCollected: 0,
			campaignFinished: false,
			deadline: new Date(0),
			isBeneficiary: false,
			state: ''
		},
		contributionAmount: '0'
	}
	constructor(props){
		super(props);
		this.onContribute = this.onContribute.bind(this);
	};
	async componentDidMount(){
		const currentCampaign = await this.getCampaign(this.getCampaignAddress())
		this.setState({
			campaign: currentCampaign
		})
	}
	getCampaignAddress(){
		return this.props.match.params.address
	}
	async getCampaign(address)
	{
		const accounts = await web3.eth.getAccounts();
		const contract = createContract(address);
		const name = await contract.methods.name().call();
		const targetAmount = await contract.methods.targetAmount().call();
		const totalCollected = await contract.methods.totalCollected().call();
		const beforeDeadline = await contract.methods.beforeDeadline().call();
		// const currentTime = Date.now();
		// const blockCurentTime = await contract.methods.getBlockTime().call();
		const deadlineSec = await contract.methods.fundingDeadline().call();
		const collected = await contract.methods.collected().call();
		const beneficiary = await contract.methods.beneficiary().call();
		const state = await contract.methods.state().call();
		const date = new Date(0)
		
		date.setUTCSeconds(deadlineSec);

		return{
			name: name,
			targetAmount: targetAmount,
			totalCollected: totalCollected,
			campaignFinished: !beforeDeadline && collected,
			deadline: date,
			isBeneficiary: beneficiary.toLowerCase() === accounts[0].toLowerCase(),
			state: state,
			collected: collected.toString()
		}
	}
	render(){
		return(
			<div>
				<Table celled padded color="teal" striped>
					<Table.Header>
						<TableRow>
							<Table.HeaderCell>Name</Table.HeaderCell>
							<Table.HeaderCell>Value</Table.HeaderCell>
						</TableRow>
					</Table.Header>
					<TableBody>
						<TableRow>
							<Table.Cell singleLine>
								Name
							</Table.Cell>
							<Table.Cell singleLine>
								{this.state.campaign.name}
							</Table.Cell>
						</TableRow>
						<TableRow>
							<Table.Cell singleLine>
								Target Amount
							</Table.Cell>
							<Table.Cell singleLine>
								{this.state.campaign.targetAmount}
							</Table.Cell>
						</TableRow>
						<TableRow>
							<Table.Cell singleLine>
								Total Collected
							</Table.Cell>
							<Table.Cell singleLine>
								{this.state.campaign.totalCollected}
							</Table.Cell>
						</TableRow>
						<TableRow>
							<Table.Cell singleLine>
								Campaign Finished
							</Table.Cell>
							<Table.Cell singleLine>
								{this.state.campaign.campaignFinished.toString()}
							</Table.Cell>
						</TableRow>
						<TableRow>
							<Table.Cell singleLine>
								Deadline
							</Table.Cell>
							<Table.Cell singleLine>
								{this.state.campaign.deadline.toString()}
							</Table.Cell>
						</TableRow>
						<TableRow>
							<Table.Cell singleLine>
								Is Beneficiary
							</Table.Cell>
							<Table.Cell singleLine>
								{this.state.campaign.isBeneficiary.toString()}
							</Table.Cell>
						</TableRow>
						<TableRow>
							<Table.Cell singleLine>
								state
							</Table.Cell>
							<Table.Cell singleLine>
								{this.state.campaign.state}
							</Table.Cell>
						</TableRow>
						<TableRow>
							<Table.Cell singleLine>
								collected
							</Table.Cell>
							<Table.Cell singleLine>
								{this.state.campaign.collected}
							</Table.Cell>
						</TableRow>
						
					</TableBody>
					<Table.Footer fullWidth>
						<Table.Row>
							<Table.HeaderCell colSpan="2">
								{this.campaignIntractionSection()}
							</Table.HeaderCell>
						</Table.Row>
					</Table.Footer>
				</Table>
			</div>
		);
	}
	campaignIntractionSection()
	{
		if(this.state.campaign.campaignFinished)
		{
			return this.postCampaignInterface()
		}
		else
		{
			return this.contributeInterface()
		}
	}
	postCampaignInterface()
	{
		if(this.state.campaign.state === this.ONGOING_STATE){
			return <div>
				<Button
				type='submit'
				positive
				onClick={(e) => this.finishCrowd()}>
					<Button.Content>
					Finish Campaign
					</Button.Content>
				</Button>
			</div>
		}
		if(this.state.campaign.state === this.SUCCEEDED_STATE && this.state.campaign.isBeneficiary === true){
			return <div>
				<Button type='submit' positive>Collect Funds</Button>
			</div>
		}
		if(this.state.campaign.state === this.FAILED_STATE){
			return <div>
				<Button type='submit' positive>Refund</Button>
			</div>
		}
	}
	contributeInterface()
	{
		return <div>
			<Input
				action={{
					color: 'teal',
					content: 'Contribute',
					onClick: this.onContribute
				}}
				actionPosition='left'
				label='ETH'
				labelPosition='right'
				placeholder='1'
				onChange={(e) => this.setState({contributionAmount: e.target.value})}
			/>
			</div>
	}
	async onContribute(event)
	{
		const accounts = await web3.eth.getAccounts();
		const contract = createContract(this.getCampaignAddress());
		const amount = web3.utils.toWei(this.state.contributionAmount, 'ether');
		await contract.methods.contribute().send({
			from: accounts[0],
			value: amount
		});
		// const campaign = this.state.campaign;
		// campaign.totalCollected = Number.parseInt(campaign.totalCollected) + Number.parseInt(amount)
		// this.setState({campaign: campaign});
		const currentCampaign = await this.getCampaign(this.getCampaignAddress())
		this.setState({
			campaign: currentCampaign
		})
	}
	async finishCrowd(event)
	{
		const accounts = await web3.eth.getAccounts();
		const contract = createContract(this.getCampaignAddress());
		try {
			let res = await contract.methods.finishCrowdFunding().send({
				from: accounts[0],
				gas: 67329
			});
		
		} catch (e) {
			alert(e)
			console.log(e);
		}
		// alert(res.logs[0]);
		const currentCampaign = await this.getCampaign(this.getCampaignAddress())
		this.setState({
			campaign: currentCampaign
		})
	}
}