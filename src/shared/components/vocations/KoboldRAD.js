import {observer} from 'mobx-react';
import React, {Component} from 'react';
import store from '../../stores/KoboldStore';
import VocationButton from '../buttons/VocationButton';
import KoboldRADButton from '../buttons/RADButton';
import {Paper, Typography, IconButton, Button} from 'material-ui';

@observer
export default class KoboldRAD extends Component {

  generateVoc = (type) => {
    let vocArr = [];
    let count = 0;
    for (let voc in store.vocation.list) {
      if (store.vocation.list[voc].type === type) {
        count++;
        vocArr.push(<VocationButton key={count} name={voc}/>);
      }
    }
    if (vocArr.length !== 0) {
      vocArr.splice(0, 0, <hr key={0}/>);
    }
    return vocArr;
  };

  generateTech = () => {
    let techsArr = [];
    let count = 0;
    for (let tech in store.tech.list) {
      if (!store.tech.getResearched(tech) && store.tech.getAvailable(tech)) {
        count++;
        techsArr.push(<KoboldRADButton key={count} name={tech}/>);
      }
    }
    if (techsArr.length !== 0) {
      techsArr.splice(0, 0, <hr key={0}/>);
    }
    return techsArr;
  };

  render() {
    const hidden = store.kobold.getCount() < 10;

    const style = {
      padding: 16,
      margin: 10,
      width: 300,
      float: 'left'
    };

    const ichorPerSecond = store.rad.getIchorPerTick() * 4;


    return (
      <Paper elevation={4} style={style} hidden={hidden}>
        <Typography type="headline" component="h3" align="center">
          Research & Development
        </Typography>
        <div>
          <Typography type="body1" component="p">
            Research Ichor: {store.rad.getIchorCount(0)}/{store.rad.getIchorCount(1)} (+ {ichorPerSecond}/s)
          </Typography>

          {[...this.generateVoc('rad')]}
          {[...this.generateTech()]}

        </div>
      </Paper>
    );
  }
}
