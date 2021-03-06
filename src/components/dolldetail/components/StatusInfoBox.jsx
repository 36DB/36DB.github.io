import React from 'react';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import InfoBox from '../../common/InfoBox';
import HorizonLine from '../../common/HorizonLine';
import SmallSelector from '../../common/SmallSelector';

const style = theme => ({
  container: {
    paddingTop: theme.spacing.unit * 0.75,
    paddingBottom: theme.spacing.unit * 0.75,
    paddingLeft: theme.spacing.unit * 2,
  },
  statusBar: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    border: '1px solid grey',
  },
  selectors: {
    display: 'flex',
  },
  selectorLabel: {
    fontSize: '0.8em',
    color: 'black',
  },
  selector: {
    color: 'black',
  },
});

const fullLvValues = Array(120).fill().map((_, i) => ({ value: i + 1, name: i + 1 }));
const fullFavorValues = Array(200).fill().map((_, i) => ({ value: i + 1, name: i + 1 }));

let lvValues = fullLvValues;
let favorValues = fullFavorValues;

class StatusInfoBox extends React.Component {
  state = {
    level: 100,
    favor: 100,
  };

  constructor(props) {
    super(props);

    props.handler(100, 100);

    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.handleFavorChange = this.handleFavorChange.bind(this);
  }

  componentWillMount() {
    const { id } = this.props;

    if (id < 20000) {
      lvValues = fullLvValues.slice(0, 100);
      favorValues = fullFavorValues.slice(0, 150);
    } else {
      lvValues = fullLvValues;
      favorValues = fullFavorValues;
    }
  }

  handleLevelChange = (event) => {
    this.setState({ level: event.target.value }, () => {
      const { handler } = this.props;
      const { level, favor } = this.state;
      handler(level, favor);
    });
  }

  handleFavorChange = (event) => {
    this.setState({ favor: event.target.value }, () => {
      const { handler } = this.props;
      const { level, favor } = this.state;
      handler(level, favor);
    });
  }

  render() {
    const { classes, stats, t } = this.props;
    const { level, favor } = this.state;

    const buildRow = (label, value, maxValue, color) => {
      const statusRate = Math.min(1, value / maxValue) * 100;
      const statusBackground = {
        background: `linear-gradient(to right, ${color} ${statusRate}%, transparent ${statusRate}%)`,
      };

      return [
        <Grid key="row" className={classes.container} container spacing={8}>
          <Grid item xs><Typography>{label}</Typography></Grid>
          <Grid item xs><Typography>{value}</Typography></Grid>
          <Grid item xs={8}>
            <div className={classes.statusBar} style={statusBackground} />
          </Grid>
        </Grid>,
        <HorizonLine key="hr" />,
      ];
    };
    const selectors = (
      <div className={classes.selectors}>
        <div className={classes.selectorLabel}>
          {t('Stat.level')}
        </div>
        <SmallSelector
          values={lvValues}
          selected={level}
          onChange={this.handleLevelChange}
        />
        <div className={classes.selectorLabel}>
          {t('Stat.favor')}
        </div>
        <SmallSelector
          values={favorValues}
          selected={favor}
          onChange={this.handleFavorChange}
        />
      </div>
    );
    return (
      <InfoBox name={t('PageMessage.Status')} selector={selectors}>
        {buildRow(t('Stat.hp'), stats.hp, 1300, 'red')}
        {buildRow(t('Stat.pow'), stats.pow, 200, 'brown')}
        {buildRow(t('Stat.hit'), stats.hit, 100, 'yellow')}
        {buildRow(t('Stat.dodge'), stats.dodge, 150, 'green')}
        {buildRow(t('Stat.rate'), stats.rate, 120, 'orange')}
      </InfoBox>
    );
  }
}

export default compose(
  translate(),
  withStyles(style),
)(StatusInfoBox);
