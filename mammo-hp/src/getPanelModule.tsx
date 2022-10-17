import React from 'react';
import LesionMatch from './panels/LesionMatch';
import MammoHPPanel from './panels/MammoHpPanel';
import MammoHPPanelVertical from './panels/MammoHpPanelVertical';

const getPanelModule = ({
  servicesManager,
  commandsManager,
  extensionManager,
}) => {
  const panelComponent = props => {
    return (
      <div style={{
        color: "white"
      }}>
        This is panel module
      </div>
    )
  }

  const wrappedMammoHPPanel = () => {
    return (
      <MammoHPPanel
        servicemanager={servicesManager}
      />
    )
  }
  return [
    {
      name: 'RightPanel',
      iconName: 'group-layers',
      iconLabel: 'Right Panel',
      label: 'Right Panel',
      component: panelComponent,
    },
    {
      name: 'verticalHPPanel',
      iconName: 'group-layers',
      iconLabel: 'Hanging Protocol',
      label: 'Hanging Protocol',
      component: MammoHPPanelVertical
    },
    {
      name: 'RightBottomPanel',
      iconName: 'group-layers',
      iconLabel: 'Lesion Match',
      label: 'Lesion Match',
      component: LesionMatch
    },
    {
      name: 'LeftPanel',
      iconName: 'group-layers',
      iconLabel: 'Right Panel',
      label: 'Left Panel',
      component: panelComponent
    },
    {
      name: 'TopPanel',
      iconName: 'group-layers',
      iconLabel: 'Top Panel',
      label: 'Top Panel',
      component: panelComponent
    },
    {
      name: 'BottomPanel',
      iconName: 'group-layers',
      iconLabel: 'Bottom Panel',
      label: 'Hanging Protocols',
      component: wrappedMammoHPPanel
    },
  ]
}


export default getPanelModule;
