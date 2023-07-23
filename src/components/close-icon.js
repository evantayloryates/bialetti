import React from 'react';

const suppressProductPopper = () => {
  const popperEl = document.querySelectorAll(".shirt-icon-container")[0];
  popperEl.classList.add('no-pointer');
  // setTimeout(() => {
  //   popperEl.classList.remove('no-pointer');
  // }, 500); // .5 seconds
}

const CloseIcon = ({ onEvent, onClick }) => {

  const handleClick = (event) => {
    onEvent(event, "closeBtn", "click")
    suppressProductPopper()
    onClick()
  }
  return (
    <div className={`panel-close-btn`} onClick={handleClick}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.312365 1.03933L1.04161 0.320397C1.4587 -0.106799 2.15641 -0.106799 2.57349 0.320397L7.00134 4.73813L11.4292 0.320397C11.8463 -0.106799 12.544 -0.106799 12.9605 0.320397L13.6796 1.03933C14.1068 1.45602 14.1068 2.15413 13.6796 2.57101L9.26188 6.99867L13.6796 11.4267C14.1068 11.8436 14.1068 12.5411 13.6796 12.9584L12.9605 13.6878C12.544 14.1041 11.8463 14.1041 11.4292 13.6878L7.00134 9.2596L2.57349 13.6878C2.15641 14.1041 1.4587 14.1041 1.04161 13.6878L0.312365 12.9584C-0.104122 12.5411 -0.104122 11.8436 0.312365 11.4267L4.74022 6.99867L0.312365 2.57082C-0.104122 2.15413 -0.104122 1.45602 0.312365 1.03933Z" fill="#2e2c2c"/>
      </svg>
    </div>
  )
}

export default CloseIcon;