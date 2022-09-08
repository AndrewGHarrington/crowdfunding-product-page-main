const btnHamburger = document.querySelector('.btn-hamburger');
const btnCloseNav = document.querySelector('.btn-close-nav');
const btnBackProject = document.querySelector('.btn-back-project');
const selectionModalClose = document.querySelector('.selection-modal-close');
const btnSelectionModalClose = null;
const btnBookmark = document.querySelector('.btn-bookmark');
const navListContainer = document.querySelector('.nav-list-container');
const aboutContainer = document.querySelector('.about-container');
const selectionModal = document.querySelector('.selection-modal');
const modalPledgeCompleteContainer = document.querySelector('.modal-pledge-complete-container');
const donationAmount = document.querySelector('.donation-amount').textContent;
const donationAmountNum = Number(donationAmount.replace(/\W/g,''));
const goalAmount = 100000;
const dontationPercentage = Math.round((donationAmountNum/goalAmount) * 100);
const progressBar = document.querySelector('.progress-bar-container');
const radioList = document.querySelectorAll('input[type=radio]');
let selectedRadioIndex = null;
const selectedPledgeContainerList = document.querySelectorAll('.selected-pledge-container');
const noRewardContainer = document.querySelector('.pledge-no-reward');
const bambooContainer = document.querySelector('.pledge-bamboo');
const blackContainer = document.querySelector('.pledge-black');
const mohaganyContainer = document.querySelector('.pledge-mohagany');
const bambooTextInput = document.querySelector('.bamboo-text-input');
const blackTextInput = document.querySelector('.black-text-input');
const bambooBtnContinue = bambooContainer.querySelector('.btn-continue');
const blackBtnContinue = blackContainer.querySelector('.btn-continue');
const pledgeAmountsList = document.querySelectorAll('.stands-left');
let bambooPledgesLeftAmt = pledgeAmountsList[0].textContent;
let blackPledgesLeftAmt = pledgeAmountsList[1].textContent;


// Initilization

// keeps track if bookmark button is toggled
let btnBookmarkToggled = false;

// toggle all radios to be unchecked by default
radioList.forEach((currentRadio) => {
    currentRadio.checked = false;
});

// toggle off all selected pledge containers by default
selectedPledgeContainerList.forEach((item) => {
    item.style.display = 'none';
});

// makes sure the close button for the nav list doesn't show in desktop mode
if(window.innerWidth > 576) {
    btnCloseNav.style.display = 'none';
}

calculateProgressBar(progressBar, dontationPercentage);

// EVENT LISTENERS

// toggle off visibility of nav list close button when in desktop widths
window.addEventListener('resize', () => {
    if(window.innerWidth > 576) {
        btnCloseNav.style.display = 'none';
    } else {
        btnCloseNav.style.display = 'block';
    }
});

// smooth scroll section into view after clicking a nav link
document.querySelector('nav ul').children[0].addEventListener('click', () => {
    aboutContainer.scrollIntoView({behavior: 'smooth'});
});

// toggle on visibility of nav list when click on hamburger button
btnHamburger.addEventListener('click', () => {
    toggleModal(navListContainer);
    btnHamburger.childNodes[0].style.opacity = '0';
});

btnCloseNav.addEventListener('click', () => {
    toggleModal(navListContainer);
    btnHamburger.childNodes[0].style.opacity = '1';
});

// open project select modal
btnBackProject.addEventListener('click', () => {
    toggleModal(selectionModal);
});

selectionModalClose.addEventListener('click', () => {
    toggleModal(selectionModal);
});

btnBookmark.addEventListener('click', () => {
    if(btnBookmarkToggled) {
        document.querySelector('.bookmark-svg').removeAttribute('id', 'svg-clicked');
        btnBookmarkToggled = false;
    } else {
        document.querySelector('.bookmark-svg').setAttribute('id', 'svg-clicked');
        btnBookmarkToggled = true;
    }
});

// get all radio buttons and add an event listener
radioList[0].addEventListener('click', () => {
    selectedRadioIndex = radioList[0];
    radioList[0].checked = true;
    noRewardContainer.classList.add('pledge-selected');
    
    radioList.forEach((curRadio, curIndex) => {
        if(curRadio !== selectedRadioIndex) {
            curRadio.checked = false;
        }
    });

    toggleModal(modalPledgeCompleteContainer);
});

radioList[1].addEventListener('click', () => {
    selectedRadioIndex = radioList[1];
    radioList[1].checked = true;
    selectedPledgeContainerList[0].style.display = 'block';
    bambooContainer.classList.add('pledge-selected');
    
    checkIfSelectedRadio();
});

radioList[2].addEventListener('click', () => {
    selectedRadioIndex = radioList[2];
    radioList[2].checked = true;
    selectedPledgeContainerList[1].style.display = 'block';
    blackContainer.classList.add('pledge-selected');
    
    checkIfSelectedRadio();
});

radioList[3].addEventListener('click', () => {
    radioList[3].checked = false;
});

document.querySelector('#btn-got-it').addEventListener('click', () => {
    toggleModal(modalPledgeCompleteContainer);
});

bambooBtnContinue.addEventListener('click', () => {
    if(pledgeInRangeCheck(bambooTextInput, 25, 74)) {
        toggleModal(modalPledgeCompleteContainer);

        // reduce available bamboo stands by 1
        const amountLeft = Number(bambooPledgesLeftAmt);
        const newAmount = amountLeft - 1;
        pledgeAmountsList[0].textContent = String(newAmount);
        pledgeAmountsList[2].textContent = String(newAmount);
    }
});

blackBtnContinue.addEventListener('click', () => {
    if(pledgeInRangeCheck(blackTextInput, 75, 199)) {
        toggleModal(modalPledgeCompleteContainer);

        // reduce available bamboo stands by 1
        const amountLeft = Number(blackPledgesLeftAmt);
        const newAmount = amountLeft - 1;
        pledgeAmountsList[1].textContent = String(newAmount);
        pledgeAmountsList[3].textContent = String(newAmount);
    }
});


// FUNCTIONS

function toggleModal(modal) {
    if(modal.style.opacity === '0' || modal.style.opacity === '') {
        console.log('in toggleModal: modal was off and is now turned on');
        modal.style.opacity = '1';
        modal.style.pointerEvents = 'auto';
    } else if(modal.style.opacity === '1') {
        console.log('in toggleModal: modal was on and is now turned off');
        modal.style.opacity = '0';
        modal.style.pointerEvents = 'none';
    }

    if(modal === modalPledgeCompleteContainer) {
        selectionModal.style.opacity = '0';
        selectionModal.style.pointerEvents = 'none'
    }
}

function calculateProgressBar(progressBar, percentage) {
    const stringPercentage = String(percentage) + '%';
    progressBar.querySelector('.progress-bar').style.width = stringPercentage;
}

function checkIfSelectedRadio() {
    radioList.forEach((curRadio, curIndex) => {
        if(curRadio !== selectedRadioIndex) {
            curRadio.checked = false;
            
            switch(curIndex) {
                case 1:
                    selectedPledgeContainerList[0].style.display = 'none';
                    bambooContainer.classList.remove('pledge-selected');
                    break;
                case 2:
                    selectedPledgeContainerList[1].style.display = 'none';
                    blackContainer.classList.remove('pledge-selected');
                    break;
                default:
                    noRewardContainer.classList.remove('pledge-selected');
                    break;
            }
        }
    });
}

function pledgeInRangeCheck(input, min, max) {
    if(Number(input.value) < min || Number(input.value) > max) {
        input.value = min;
        return false;
    } else {
        return true;
    }
}