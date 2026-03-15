const galeria = {
  stickers: [
    'img/stickers/Gemini_Generated_Image_euna0feuna0feuna (1).png',
    'img/stickers/9bmrs3q3dxrmr0cwxc5r0sqxsw.png'
  ],
  vinilos: [
    'img/vinilos/cdk5ngdganrmy0cwxc8b6vnvbr.png'
  ],
  fotos: [
    'img/fotos/Gemini_Generated_Image_ft5wugft5wugft5w (1).png',
    'img/fotos/bcpjy3bk89rmr0cwxc6a7mw9kc.png'
  ],
  sublimacion: [
    'img/sublimacion/Gemini_Generated_Image_42wfni42wfni42wf (1).png',
    'img/sublimacion/ynaprbhns5rmw0cwxc8tephr2c.png',
    'img/sublimacion/ab0z2cqv3hrmw0cwxc5amg9de8.png'
  ],
  impresion3d: []
};

const whatsappLinks = {
  stickers: 'https://wa.me/5493413982456?text=Hola%2C%20me%20interesan%20los%20stickers',
  vinilos: 'https://wa.me/5493413982456?text=Hola%2C%20me%20interesan%20los%20vinilos',
  fotos: 'https://wa.me/5493413982456?text=Hola%2C%20me%20interesan%20las%20fotos',
  sublimacion: 'https://wa.me/5493413982456?text=Hola%2C%20me%20interesa%20la%20sublimaci%C3%B3n',
  impresion3d: 'https://wa.me/5493413982456?text=Hola%2C%20me%20interesa%20la%20impresi%C3%B3n%203D'
};

function renderGaleria() {
  const categorias = [
    { key: 'stickers', titulo: 'Stickers', descripcion: 'Calcomanías personalizadas en papel o vinilo con corte especial' },
    { key: 'vinilos', titulo: 'Vinilos', descripcion: 'Rotulación vehicular, vinilos de corte y decorativos' },
    { key: 'fotos', titulo: 'Fotos', descripcion: 'Impresión de alta fidelidad cromática para tus recuerdos' },
    { key: 'sublimacion', titulo: 'Sublimación', descripcion: 'Tazas, remeras y accesorios personalizados' },
    { key: 'impresion3d', titulo: 'Impresión 3D', descripcion: 'Prototipado y creación de piezas funcionales o figuras' }
  ];

  const container = document.getElementById('galeria-container');
  if (!container) return;

  categorias.forEach((cat, index) => {
    const fotos = galeria[cat.key] || [];
    const colorClase = ['border-brandCyan', 'border-brandMagenta', 'border-brandYellow', 'border-brandCyan', 'border-brandMagenta'][index];
    const hoverClase = ['hover:border-brandCyan', 'hover:border-brandMagenta', 'hover:border-brandYellow', 'hover:border-brandCyan', 'hover:border-brandMagenta'][index];
    const btnClase = ['bg-brandCyan', 'bg-brandMagenta', 'bg-brandYellow', 'bg-brandCyan', 'bg-brandMagenta'][index];

    let html = `
      <div class="categoria-seccion mb-24" id="${cat.key}">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div class="max-w-2xl">
            <h3 class="text-3xl md:text-4xl font-black mb-4">${cat.titulo}</h3>
            <p class="text-gray-400 text-lg">${cat.descripcion}</p>
          </div>
          <a href="${whatsappLinks[cat.key]}" class="inline-flex items-center gap-3 ${btnClase} hover:opacity-90 text-black px-8 py-4 rounded-full font-bold transition-all transform hover:-translate-y-1 whitespace-nowrap">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412 0 6.556-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.46l.33.197c1.551.925 3.312 1.413 5.119 1.414 5.399 0 9.791-4.393 9.795-9.793.003-5.392-4.38-9.782-9.774-9.782-5.397 0-9.791 4.393-9.794 9.794-.001 2.069.545 4.086 1.577 5.86l.216.375-1.012 3.701 3.792-.995z"/></svg>
            Consultar
          </a>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    `;

    if (fotos.length === 0) {
      html += `
        <div class="col-span-full bg-brandBlack/50 border-2 border-dashed border-white/10 rounded-2xl p-12 text-center">
          <p class="text-gray-500">Agregá fotos en img/${cat.key}/</p>
        </div>
      `;
    } else {
      fotos.forEach((foto, i) => {
        html += `
          <div class="aspect-square rounded-2xl overflow-hidden ${colorClase} ${hoverClase} border-2 transition-all duration-300 hover:scale-[1.02] cursor-pointer" onclick="abrirLightbox('${foto.replace(/'/g, "\\'")}')">
            <img src="${foto}" alt="${cat.titulo}" class="w-full h-full object-cover">
          </div>
        `;
      });
    }

    html += `
        </div>
      </div>
    `;

    container.innerHTML += html;
  });
}

document.addEventListener('DOMContentLoaded', renderGaleria);

let lightboxFotos = [];
let lightboxIndex = 0;

function abrirLightbox(src) {
  lightboxFotos = Object.values(galeria).flat();
  lightboxIndex = lightboxFotos.indexOf(src);
  
  let modal = document.getElementById('lightbox-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'lightbox-modal';
    modal.className = 'fixed inset-0 z-[100] bg-black/95 flex items-center justify-center hidden';
    modal.innerHTML = `
      <button onclick="cerrarLightbox()" class="absolute top-6 right-6 text-white hover:text-brandCyan text-4xl font-bold transition-colors z-10">&times;</button>
      <button onclick="cambiarFoto(-1)" class="absolute left-4 md:left-8 text-white hover:text-brandCyan text-5xl font-bold transition-colors p-4">&#10094;</button>
      <button onclick="cambiarFoto(1)" class="absolute right-4 md:right-8 text-white hover:text-brandCyan text-5xl font-bold transition-colors p-4">&#10095;</button>
      <img id="lightbox-img" class="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl" src="">
      <div id="lightbox-counter" class="absolute bottom-6 text-white/70 text-sm font-medium"></div>
    `;
    modal.onclick = function(e) {
      if (e.target === modal) cerrarLightbox();
    };
    document.body.appendChild(modal);
  }
  actualizarLightbox();
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function cambiarFoto(direccion) {
  lightboxIndex += direccion;
  if (lightboxIndex < 0) lightboxIndex = lightboxFotos.length - 1;
  if (lightboxIndex >= lightboxFotos.length) lightboxIndex = 0;
  actualizarLightbox();
}

function actualizarLightbox() {
  document.getElementById('lightbox-img').src = lightboxFotos[lightboxIndex];
  document.getElementById('lightbox-counter').textContent = `${lightboxIndex + 1} / ${lightboxFotos.length}`;
}

function cerrarLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', function(e) {
  const modal = document.getElementById('lightbox-modal');
  if (!modal || modal.classList.contains('hidden')) return;
  
  if (e.key === 'Escape') cerrarLightbox();
  if (e.key === 'ArrowLeft') cambiarFoto(-1);
  if (e.key === 'ArrowRight') cambiarFoto(1);
});
