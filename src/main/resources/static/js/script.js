document.addEventListener('DOMContentLoaded', () => {
    // Loading animation
    const loader = document.querySelector('.loader-wrapper');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.display = 'none';     // прячем из потока после затухания
            loader.style.pointerEvents = 'none';
        }, 2000);
    });

    const emailLink = document.getElementById("email-link");
    emailLink.addEventListener("click", function(event) {
        event.preventDefault(); // предотвращает переход по ссылке
        const email = "oleksandra.s.mala@gmail.com";
        navigator.clipboard.writeText(email)
            .then(() => {
                alert("Email copied to clipboard!");
            })
            .catch(err => {
                console.error("Failed to copy: ", err);
            });
    });

    // Scrolled Handler
    const header = document.querySelector('header');
    const onScroll = () => {
        if (!header) return;
        header.classList.toggle('scrolled', window.scrollY > 100);
    };
    window.addEventListener('scroll', onScroll);
    onScroll(); // применим состояние сразу

    // Опции наблюдателя
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };



    // Универсальный фабричный наблюдатель
    const makeObserver = (stagger = false) =>
        new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const delay = stagger ? (+entry.target.dataset.stagger || 0) * 200 : 0;
                setTimeout(() => entry.target.classList.add('animated'), delay);
                obs.unobserve(entry.target); // чтобы не дёргалось повторно
            });
        }, observerOptions);

    // Project cards (со ступенчатой задержкой)
    const projectObserver = makeObserver(true);
    document.querySelectorAll('.project-card').forEach((card, idx) => {
        card.dataset.stagger = idx;
        projectObserver.observe(card);
    });

    // Timeline (без задержки)
    const timelineObserver = makeObserver(false);
    document.querySelectorAll('.timeline-content').forEach(item => {
        timelineObserver.observe(item);
    });

    // Achievements (со ступенчатой задержкой)
    const achievementObserver = makeObserver(true);
    document.querySelectorAll('.achievement-card').forEach((card, idx) => {
        card.dataset.stagger = idx;
        achievementObserver.observe(card);
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
});
