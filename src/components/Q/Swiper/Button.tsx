import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';

import { ChoiceActionType, no, NO, yes, YES, RESET, resetChoice, INIT_STATE } from './redux/actions';
import { LastChoiceState } from './redux/reducers';

interface Props {
  icon: IconDefinition,
  type: ChoiceActionType,
  lastChoice: LastChoiceState,
  yes: Function,
  no: Function,
  resetChoice: Function,
}

const buttonTypeToColor = {
  [YES]: '#8ed97c',
  [NO]: '#e95c56',
  [RESET]: '#8d8d8d',
  [INIT_STATE]: '#8d8d8d',
};

const Button: FunctionComponent<Props> = ({ icon, type, lastChoice: { currentCardIndex }, ...actions }) => {
  const onClick = () => {
    if (type === YES) {
      actions.yes(currentCardIndex);
    } else if (type === NO) {
      actions.no(currentCardIndex);
    } else {
      actions.resetChoice();
    }
  };

  let className;

  if (currentCardIndex > 0) {
    if (type === RESET) {
      className = 'hide';
    }
  } else {
    if (type !== RESET) {
      className = 'hide';
    }
  }

  return (
    <div className={`button ${className}`} onClick={onClick}>
      <FontAwesomeIcon icon={icon} size="4x" color={buttonTypeToColor[type]} />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  lastChoice: state.lastChoice,
});

export default connect(
  mapStateToProps,
  { yes, no, resetChoice },
)(Button);
