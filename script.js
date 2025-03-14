// Đợi cho tài liệu HTML tải xong
document.addEventListener('DOMContentLoaded', function() {
    // Xử lý navbar thu gọn khi cuộn trang
    const navbar = document.querySelector('.navbar');
    
    function checkScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('py-2');
            navbar.classList.remove('py-3');
        } else {
            navbar.classList.add('py-3');
            navbar.classList.remove('py-2');
        }
    }
    
    // Kiểm tra khi tải trang
    checkScroll();
    
    // Kiểm tra khi cuộn trang
    window.addEventListener('scroll', checkScroll);
    
    // Animation khi cuộn đến các phần tử
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkVisibility() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    // Kiểm tra khi tải trang
    checkVisibility();
    
    // Kiểm tra khi cuộn trang
    window.addEventListener('scroll', checkVisibility);
    
    // Smooth scrolling cho các liên kết neo
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Bỏ qua nếu là toggle dropdown
            if (this.classList.contains('dropdown-toggle')) return;
            
            // Bỏ qua nếu là "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Đóng navbar mobile nếu đang mở
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
                
                // Cuộn đến phần tử đích
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Xử lý form liên hệ
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Lấy giá trị từ form
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Kiểm tra dữ liệu form (có thể bỏ qua vì đã có validate của HTML)
            if (!name || !email || !subject || !message) {
                alert('Vui lòng điền đầy đủ thông tin!');
                return;
            }
            
            // Trong thực tế, sẽ gửi dữ liệu đến server
            // Ở đây chỉ hiển thị thông báo thành công
            alert('Tin nhắn của bạn đã được gửi thành công!');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Xử lý active nav link dựa trên vị trí cuộn
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            const href = link.getAttribute('href');
            if (href === '#' + currentSection || 
                (href === 'index.html' && window.scrollY < 100)) {
                link.classList.add('active');
            }
        });
    }
    
    // Kiểm tra khi tải trang
    updateActiveNavLink();
    
    // Kiểm tra khi cuộn trang
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Thêm class animate-on-scroll cho các phần tử cần hiệu ứng
    document.querySelectorAll('.row > div, .section-title, .contact-info, .card, .about-content > div').forEach(element => {
        element.classList.add('animate-on-scroll');
    });
    
    // Chức năng carousel tự động cho projects
    const carousel = document.getElementById('projectsCarousel');
    if (carousel) {
        const carouselInstance = new bootstrap.Carousel(carousel, {
            interval: 5000,
            ride: 'carousel'
        });
    }
    
    // Hover effect cho các card
    const memberCards = document.querySelectorAll('.member-card');
    
    memberCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.avatar-img').style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.avatar-img').style.transform = 'scale(1)';
        });
    });
});