window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 30) {
      header.style.backgroundColor = '#111';
    } else {
      header.style.backgroundColor = '#000';
    }
  });
  