import React, { Component } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount
    } = this.props;

    const items = [
      {
        header: manager,
        meta: "Endereço do mantenedor da campanha",
        description:
          "O mantenedor desta campanha pode realizar pedidos de retirada",
        style: { overflowWrap: "break-word" }
      },
      {
        header: minimumContribution,
        meta: "Contribuição mínima (wei)",
        description:
          "Você deve contribuir com pelo menos essa quantidade de wei para se toranar um contribuinte."
      },
      {
        header: requestsCount,
        meta: "Número de requisições",
        description:
          "Requisições de retirada da campanha. Essas requisições devem ser aprovadas pelos contribuintes."
      },
      {
        header: approversCount,
        meta: "Quantidade de contribuintes",
        description:
          "Quantidade de pessoas que já doaram a essa campanha."
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Caixa da empresa (ether)",
        description:
          "Esse é o total de ether arrecadado pela campanha."
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Visualizar Campanha</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>Ver requisições de retirada</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
