

    const sections = ['intro', 'config', 'menu', 'temporal', 'memoria', 'grupal', 'proquident'];
    const tabs = document.querySelectorAll('.tab-btn');

    function showSection(id, btn) {
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        tabs.forEach(t => t.classList.remove('active'));
        if (btn) btn.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        updateProgress();
    }

    function showSectionByIndex(i) {
        showSection(sections[i], tabs[i]);
    }

    function updateProgress() {
        const active = [...document.querySelectorAll('.section')].findIndex(s => s.classList.contains('active'));
        const pct = (active / (sections.length - 1)) * 100;
        document.getElementById('progress-bar').style.width = pct + '%';
    }

    function toggleAcc(btn) {
        const body = btn.nextElementSibling;
        const isOpen = btn.classList.contains('open');
        document.querySelectorAll('.acc-trigger').forEach(b => {
            b.classList.remove('open');
            if (b.nextElementSibling) b.nextElementSibling.classList.remove('open');
        });
        if (!isOpen) {
            btn.classList.add('open');
            if (body) body.classList.add('open');
        }
    }

    function showToast(msg) {
        const t = document.getElementById('toast');
        document.getElementById('toast-text').innerText = msg;
        t.classList.add('show');
        setTimeout(() => t.classList.remove('show'), 2500);
    }

    function copyText(el, text) {
        navigator.clipboard.writeText(text);
        showToast('Pregunta copiada');
    }

    function copyResult(id) {
        const text = document.getElementById(id).innerText;
        navigator.clipboard.writeText(text);
        showToast('Texto copiado');
    }

    // Menu checkboxes
    document.querySelectorAll('.menu-check').forEach(cb => {
        cb.addEventListener('change', () => {
            const checked = [...document.querySelectorAll('.menu-check:checked')];
            const icon = cb.closest('label').querySelector('.check-icon');
            if (checked.length > 3 && cb.checked) {
                cb.checked = false;
                showToast('Solo 3 opciones');
                return;
            }
            if (icon) icon.style.color = cb.checked ? 'var(--green)' : '#ddd';
            const allChecked = [...document.querySelectorAll('.menu-check:checked')];
            const container = document.getElementById('selected-options');
            const inputs = document.getElementById('use-inputs');
            if (allChecked.length >= 3) {
                container.style.display = 'block';
                inputs.innerHTML = allChecked.map(c => `<div class="form-group"><label class="form-label">Uso para: <strong>${c.value}</strong></label><input class="form-input" placeholder="Ejemplo de uso profesional..."></div>`).join('');
            } else {
                container.style.display = 'none';
            }
        });
    });

    // Simular generación de memoria (versión local sin API externa)
    function generateMemoria() {
        const prof = document.getElementById('mem-prof').value.trim();
        if (!prof) {
            showToast('Ingresa tu profesión');
            return;
        }
        const name = document.getElementById('mem-name').value.trim() || "[tu apodo]";
        const age = document.getElementById('mem-age').value.trim() || "[tu edad]";
        const area = document.getElementById('mem-area').value.trim() || "[tu área]";
        const style = document.getElementById('mem-style').value.trim() || "con ejemplos prácticos";
        
        const result = `Quiero que recuerdes la siguiente información sobre mí para futuras conversaciones:\n\nMi apodo es "${name}", soy ${prof}, tengo ${age} años y mi área de interés o trabajo es "${area}". Prefiero que me expliques las cosas ${style}. Me gustaría que adaptes tus respuestas a este perfil.`;
        
        document.getElementById('mem-text').innerText = result;
        document.getElementById('mem-result').style.display = 'block';
    }

    // Simular generación de caso
    const casosProquident = [
        { titulo: "Expansión Digital", descripcion: "Proquident necesita llegar a consultorios rurales en Antioquia. El equipo no tiene estrategia digital.", tarea: "Usen ChatGPT para diseñar una campaña multicanal con mensajes clave y ejemplos de contenido." },
        { titulo: "Optimización de Logística", descripcion: "Los tiempos de entrega de productos odontológicos han aumentado un 30% en los últimos meses.", tarea: "Propongan una solución logística usando IA para optimizar rutas y reducir tiempos." },
        { titulo: "Capacitación de Clientes", descripcion: "Los odontólogos no conocen todos los productos que Proquident ofrece. Necesitan una estrategia de capacitación.", tarea: "Diseñen un plan de capacitación virtual usando ChatGPT para crear contenido educativo." },
        { titulo: "Competencia Agresiva", descripcion: "Un nuevo competidor está ofreciendo precios más bajos en productos similares.", tarea: "Analicen estrategias de diferenciación y fidelización con ayuda de IA." }
    ];

    function generateCase() {
        const randomIndex = Math.floor(Math.random() * casosProquident.length);
        const caso = casosProquident[randomIndex];
        document.getElementById('case-title').innerText = caso.titulo;
        document.getElementById('case-desc').innerText = caso.descripcion;
        document.getElementById('case-task').innerText = caso.tarea;
        document.getElementById('case-display').style.display = 'block';
    }

    function copyCase() {
        const title = document.getElementById('case-title').innerText;
        const desc = document.getElementById('case-desc').innerText;
        const task = document.getElementById('case-task').innerText;
        navigator.clipboard.writeText(`🦷 DESAFÍO PROQUIDENT\n📌 ${title}\n${desc}\n✅ TAREA: ${task}`);
        showToast('Caso copiado');
    }

    // Modal data
    const modalData = {
        educativo: { icon: '<i class="fa-solid fa-graduation-cap"></i>', title: 'Contexto Educativo 🎓', items: ['Talleres colaborativos', 'Proyectos grupales', 'Actividades académicas', 'Tutorías entre pares'] },
        laboral: { icon: '<i class="fa-solid fa-building"></i>', title: 'Contexto Laboral 💼', items: ['Solución de problemas', 'Generación de informes', 'Planeación de tareas', 'Reuniones de equipo'] },
        creativo: { icon: '<i class="fa-solid fa-palette"></i>', title: 'Contexto Creativo 🎨', items: ['Lluvia de ideas', 'Creación de contenido', 'Brainstorming grupal', 'Diseño colaborativo'] },
        tecnologico: { icon: '<i class="fa-solid fa-code"></i>', title: 'Contexto Tecnológico 💻', items: ['Desarrollo de código', 'Análisis de sistemas', 'Debugging colaborativo', 'Revisión de documentación'] }
    };

    function openModal(type) {
        const data = modalData[type];
        if (!data) return;
        document.getElementById('modal-icon').innerHTML = data.icon;
        document.getElementById('modal-title').innerHTML = data.title;
        const listHtml = data.items.map(item => `<li><i class="fa-solid fa-check-circle"></i> ${item}</li>`).join('');
        document.getElementById('modal-list').innerHTML = listHtml;
        document.getElementById('modal').style.display = 'flex';
    }

    function closeModal() {
        document.getElementById('modal').style.display = 'none';
    }

    function closeModalOnOutside(event) {
        if (event.target === document.getElementById('modal')) {
            closeModal();
        }
    }

    updateProgress();


     function showToast(msg) {
        const t = document.getElementById('toast');
        document.getElementById('toast-text').innerText = msg;
        t.classList.add('show');
        setTimeout(() => t.classList.remove('show'), 2500);
    }

    function copyPrompt(element, id) {
        const promptText = document.getElementById(id).innerText;
        navigator.clipboard.writeText(promptText);
        showToast('Prompt copiado al portapapeles');
        
        const originalText = element.querySelector('.prompt-copy-hint').innerHTML;
        element.querySelector('.prompt-copy-hint').innerHTML = '<i class="fa-solid fa-check"></i> ¡Copiado!';
        setTimeout(() => {
            element.querySelector('.prompt-copy-hint').innerHTML = originalText;
        }, 1500);
    }

    // Progress bar
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('progress-bar').style.width = scrolled + '%';
    });