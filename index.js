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
let donationAmount = document.querySelector('.donation-amount').textContent;
let donationAmountNum = Number(donationAmount.replace(/\W/g,''));
const goalAmount = 100000;
let dontationPercentage = Math.round((donationAmountNum/goalAmount) * 100);
let backerAmount = document.querySelector('.backer-amount');
let progressBar = document.querySelector('.progress-bar-container');
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
const btnBambooSelect = document.querySelector('.btn-bamboo-select');
const btnBlackSelect = document.querySelector('.btn-black-select');

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

// toggles bookmark button
btnBookmark.addEventListener('click', () => {
    if(btnBookmarkToggled) {
        document.querySelector('.bookmark-svg').removeAttribute('id', 'svg-clicked');
        btnBookmarkToggled = false;
        btnBookmark.querySelector('span').innerText = 'Bookmark';
        btnBookmark.querySelector('span').style.paddingLeft = '15px';
    } else {
        document.querySelector('.bookmark-svg').setAttribute('id', 'svg-clicked');
        btnBookmarkToggled = true;
        btnBookmark.querySelector('span').innerText = 'Bookmarked';
        btnBookmark.querySelector('span').style.paddingLeft = '8px';
    }
});

// open project select modal
btnBackProject.addEventListener('click', () => {
    toggleModal(selectionModal);
    unselectAllPledges();
});

selectionModalClose.addEventListener('click', () => {
    toggleModal(selectionModal);
    unselectAllPledges();
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
    updateBackerTotal();
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

// open backing modal
// apply select pledge style to correct pledge card
btnBambooSelect.onclick = () => {
    toggleModal(selectionModal);
    selectedRadioIndex = radioList[1];
    radioList[1].checked = true;
    selectedPledgeContainerList[0].style.display = 'block';
    bambooContainer.classList.add('pledge-selected');
    bambooContainer.scrollIntoView({behavior: 'smooth'});
    
    checkIfSelectedRadio();
}

btnBlackSelect.onclick = () => {
    toggleModal(selectionModal);
    selectedRadioIndex = radioList[2];
    radioList[2].checked = true;
    selectedPledgeContainerList[1].style.display = 'block';
    blackContainer.classList.add('pledge-selected');
    blackContainer.scrollIntoView({behavior: 'smooth'});
    
    checkIfSelectedRadio();
}

// confirm pledge amount
// also updates the numbers for donations, backers and available products
bambooBtnContinue.addEventListener('click', () => {
    if(pledgeInRangeCheck(bambooTextInput, 25, 74)) {
        toggleModal(modalPledgeCompleteContainer);

        // reduce available bamboo stands by 1
        bambooPledgesLeftAmt = pledgeAmountsList[0].textContent;
        const amountLeft = Number(bambooPledgesLeftAmt);
        const newAmount = amountLeft - 1;
        pledgeAmountsList[0].textContent = String(newAmount);
        pledgeAmountsList[2].textContent = String(newAmount);

        updateDonationTotal();
        updateBackerTotal();
    }
});

blackBtnContinue.addEventListener('click', () => {
    if(pledgeInRangeCheck(blackTextInput, 75, 199)) {
        toggleModal(modalPledgeCompleteContainer);

        // reduce available bamboo stands by 1
        blackPledgesLeftAmt = pledgeAmountsList[1].textContent;
        const amountLeft = Number(blackPledgesLeftAmt);
        const newAmount = amountLeft - 1;
        pledgeAmountsList[1].textContent = String(newAmount);
        pledgeAmountsList[3].textContent = String(newAmount);

        updateDonationTotal();
        updateBackerTotal();
    }
});

// close confirm modal
document.querySelector('#btn-got-it').addEventListener('click', () => {
    toggleModal(modalPledgeCompleteContainer);
    unselectAllPledges();
});


// FUNCTIONS

// makes the modal visible if it is not visible, and vice-versa
// if the pledge complete modal is visible, it hides the pledge selection modal
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

// when you click a radio, it will turn on the radio you clicked and turn off the other radios
// it also adds a class to the selected pledge to add "selected" styles to it and remove those
// styles from the last selected pledge
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

// checks if the pledge amount you enter is within the range for that plede.
// if not, it will make the pledge amount the min and not continue on
function pledgeInRangeCheck(input, min, max) {
    if(Number(input.value) < min || Number(input.value) > max) {
        input.value = min;
        return false;
    } else {
        return true;
    }
}

// turn off all radios and pledge selections
function unselectAllPledges() {
    radioList.forEach((item) => {
        item.checked = false;
    });

    selectedPledgeContainerList.forEach((item) => {
        item.style.display = 'none';
    });

    noRewardContainer.classList.remove('pledge-selected');
    bambooContainer.classList.remove('pledge-selected');
    blackContainer.classList.remove('pledge-selected');
}

function convertNumberToStringWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function updateDonationTotal() {
    donationAmount = document.querySelector('.donation-amount').textContent;
    donationAmountNum = Number(donationAmount.replace(/\W/g,''));
    // update donations total
    const newDonationAmt = Number(donationAmountNum) + Number(bambooTextInput.value);
    // add $ and comma to amount
    const newDonationAmtString = convertNumberToStringWithCommas(newDonationAmt);
    document.querySelector('.donation-amount').textContent = '$' + newDonationAmtString;
    donationAmount = document.querySelector('.donation-amount').textContent;
    dontationPercentage = Math.round((donationAmountNum/goalAmount) * 100);
    progressBar = document.querySelector('.progress-bar-container');
    calculateProgressBar(progressBar, dontationPercentage);
}

function updateBackerTotal() {
    const backerAmountNum = Number(backerAmount.textContent.replace(/\W/g,''));
    const newBackerAmountNum = backerAmountNum + 1;
    const newBackerAmountString = convertNumberToStringWithCommas(newBackerAmountNum);
    backerAmount.textContent = newBackerAmountString;
}