const btnHamburger = document.querySelector('.btn-hamburger');
const btnCloseNav = document.querySelector('.btn-close-nav');
const btnBackProject = document.querySelector('.btn-back-project');
const navListContainer = document.querySelector('.nav-list-container');
const selectionModal = document.querySelector('.selection-modal');
const modalPledgeCompleteContainer = document.querySelector('.modal-pledge-complete-container');

if(window.innerWidth > 576) {
    btnCloseNav.style.display = 'none';
}

// toggle off visibility of nav list close button when in desktop widths
window.addEventListener('resize', () => {
    if(window.innerWidth > 576) {
        btnCloseNav.style.display = 'none';
    } else {
        btnCloseNav.style.display = 'block';
    }
});

// toggle on visibility of nav list when click on hamburger button
btnHamburger.addEventListener('click', () => {
    if(navListContainer.style.display === 'none' || navListContainer.style.display === '') {
        navListContainer.style.display = 'block';
        navListContainer.style.opacity = '1';
        btnHamburger.childNodes[0].style.opacity = '0';
    }
});

btnCloseNav.addEventListener('click', () => {
    if(navListContainer.style.display === 'block' || navListContainer.style.display === '') {
        navListContainer.style.display = 'none';
        navListContainer.style.opacity = '0';
        btnHamburger.childNodes[0].style.opacity = '1';
    }
});

// open project select modal
btnBackProject.addEventListener('click', () => {
    selectionModal.style.display = 'block';
});

// close modal
document.querySelector('.selection-modal-close').addEventListener('click', () => {
    selectionModal.style.display = 'none';
});