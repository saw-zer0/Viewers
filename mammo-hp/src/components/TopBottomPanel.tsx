import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import { Button, Icon } from '@ohif/ui/src/components';

const borderSize = 4;
const expandedHeight = 168;
const collapsedHeight = 56;

const baseStyle = {
  maxHeight: `${expandedHeight}px`,
  height: `${expandedHeight}px`,
  width: "100%"
};

const collapsedHideHeight = expandedHeight - collapsedHeight - borderSize;
const styleMap = {
  open: {
    top: { marginTop: '0px' },
    bottom: { marginBottom: '0px' },
  },
  closed: {
    top: { marginTop: `-${collapsedHideHeight}px` },
    bottom: { marginBottom: `-${collapsedHideHeight}px` },
  },
};

const baseClasses =
  'transition-all duration-300 ease-in-out h-100 bg-primary-dark border-black flex flex-col justify-start box-content';

const classesMap = {
  open: {
    top: `border-b-4`,
    bottom: `border-t-4`,
  },
  closed: {
    top: `border-b-4 items-end`,
    bottom: `border-t-4 items-start`,
  },
};

const openIconName = {
  top: 'push-left',
  bottom: 'push-right',
};

const position = {
  top: {
    bottom: 5,
  },
  bottom: {
    top: 5,
  },
};

const getChildComponent = (childComponents, componentOpen) => {
  if (Array.isArray(childComponents)) {
    return childComponents.find(
      _childComponent => _childComponent.name === componentOpen
    );
  } else {
    return childComponents;
  }
};

const TopBottomPanel = ({
  side,
  className,
  defaultComponentOpen,
  childComponents,
}) => {
  const { t } = useTranslation('TopBottomPanel');

  const [componentOpen, setComponentOpen] = useState(defaultComponentOpen);

  const openStatus = componentOpen ? 'open' : 'closed';
  const style = Object.assign({}, styleMap[openStatus][side], baseStyle);

  const childComponent = getChildComponent(childComponents, componentOpen);

  const getPanelButtons = () => {
    const _childComponents = Array.isArray(childComponents)
      ? childComponents
      : [childComponents];
    return _childComponents.map((childComponent, i) => {
      return (
        <Button
          key={i}
          variant="text"
          color="inherit"
          onClick={() => {
            setComponentOpen(childComponent.name);
          }}
          style={{
            minHeight: `${collapsedHeight}px`,
            height: `${collapsedHeight}px`,
          }}
          name={childComponent.name}
          className="text-xs px-1 py-1 text-white border-transparent border-b"
        >
          <div className='flex flex-row'>
            <Icon
              name={childComponent.iconName}
              className="text-primary-active"
            />
            <div className="ml-2 text-white text-xs">
              {t(childComponent.iconLabel)}
            </div>
          </div>
        </Button>
      );
    });
  };

  return (
    <div
      className={classnames(
        className,
        baseClasses,
        classesMap[openStatus][side]
      )}
      style={style}
    >
      {componentOpen ? (
        <React.Fragment>

          <div className="px-3 border-b border-secondary-light">
            <Button
              variant="text"
              color="inherit"
              rounded="none"
              onClick={() => {
                setComponentOpen(null);
              }}
              name={childComponent.name}
              className="flex flex-row items-center px-3 h-12 relative "
            >
              <Icon
                name={openIconName[side]}
                className={classnames(
                  'text-primary-active absolute',
                  side === 'left' && 'order-last'
                )}
                style={{ ...position[side] }}
              />
              <span className="flex-1 text-primary-active">
                {t(childComponent.label)}
              </span>
            </Button>
          </div>
          <childComponent.content />
        </React.Fragment>
      ) : (
        <React.Fragment>{getPanelButtons()}</React.Fragment>
      )}
    </div>
  );
};

TopBottomPanel.defaultProps = {
  defaultComponentOpen: null,
};

TopBottomPanel.propTypes = {
  side: PropTypes.oneOf(['top', 'bottom']).isRequired,
  className: PropTypes.string,
  defaultComponentOpen: PropTypes.string,
  childComponents: PropTypes.oneOfType([
    PropTypes.shape({
      iconName: PropTypes.string.isRequired,
      iconLabel: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      content: PropTypes.func, // TODO: Should be node, but it keeps complaining?
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        iconName: PropTypes.string.isRequired,
        iconLabel: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        content: PropTypes.func, // TODO: Should be node, but it keeps complaining?
      })
    ),
  ]),
};

export default TopBottomPanel;
