import {observer} from 'mobx-react';
import React, {Component} from 'react';
import store from '../../stores/KoboldStore';
import VocationButton from '../buttons/VocationButton';
import {Paper, Typography} from 'material-ui';

@observer
export default class KoboldMining extends Component {

  generateVoc = (type) => {
    let vocArr = [];
    let count = 0;
    for (let voc in store.vocation) {
      if (store.vocation[voc].type === type) {
        count++;
        vocArr.push(<VocationButton key={count} name={voc}/>);
      }
    }
    if (vocArr.length !== 0) {
      vocArr.splice(0, 0, <hr key={0}/>);
    }
    return vocArr;
  };

  render() {
    const hidden = store.getKoboldCount() < 2;

    const style = {
      padding: 16,
      margin: 10,
      width: 300,
      float: 'left'
    };

    const goldPerSecond = (Math.round(store.getGoldPerTick() * 400) / 100);
    const miningSpacePerSecond = (Math.round((store.getMiningSpacePerTick() - store.getKoboldsPerTick()) * 400) / 100);

    return (
      <Paper className="paper" elevation={4} style={style} hidden={hidden}>
        <div>
          <Typography type="headline" component="h3" align="center">
            Mineral Acquisition
          </Typography>
          <Typography type="body1" component="p">
            Gold Available: {store.getGoldCount(0)}/{store.getGoldCount(1)} (+ {goldPerSecond}/s)
          </Typography>
          <Typography type="body1" component="p">
            Space Available: {store.getMiningSpaceCount()} ({(miningSpacePerSecond >= 0) ? '+' : '-'} {Math.abs(miningSpacePerSecond)}/s)
          </Typography>

          {[...this.generateVoc('mining')]}

        </div>
      </Paper>
    );
  }
}