// ═══════════════════════════════════════════════════════════════════════
//  Gastos Adorno · manual.js — Manual de uso (overlay 📖, autoinyectable)
//  🚨 REGLA: cada vez que se agrega o cambia una función del módulo,
//  actualizar la sección correspondiente acá (y bump del ?v= en index.html).
// ═══════════════════════════════════════════════════════════════════════

function _mEsc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function _manualSecciones() {
  return [
    {
      icon: '🔐', titulo: 'Entrar una sola vez',
      desc: 'La sesión se comparte entre todos los módulos del sistema.',
      pasos: [
        'En el Hub, con el ícono 👤, ingresás con tu usuario y podés tildar "Confiar en esta computadora": después entrás a todos los módulos sin volver a escribir la clave.',
        'Al salir de cualquier módulo se cierra la sesión en todos.',
      ],
    },
    {
      icon: '📒', titulo: 'Planilla · de dónde sale cada renglón',
      desc: 'Es la misma pirámide de siempre: Unidad → Categoría → renglón. La diferencia es que casi nada se tipea: el módulo la ARMA cada vez que la abrís.',
      pasos: [
        '📄 Facturas: entran solas desde Compras cuando al contabilizar se tildó "Va a la planilla de gastos". Traen período (mes de consumo), unidad, categoría e importe. Si algo está mal, se corrige en Compras (✏ desde 📄 Facturas), no acá.',
        '👥 Sueldos Banco / Sueldos (GNC) / Honorarios: salen de RRHH por local y período. Administración = Directora + JP.',
        '🏛 IIBB, cargas sociales, impuesto al débito/crédito: salen del módulo Impuestos, ya repartidos por unidad con su regla.',
        '✍️ Lo cargado a mano en la pestaña "A mano" (resúmenes de tarjetas, banco, GNC sin comprobante).',
        '🛍 Bolsas: prorrateo automático de las facturas del año por la venta de Alcorta y Unicenter.',
        'Pasando el mouse por la columna del detalle se ve el cálculo o el motivo de cada renglón.',
        'En modo 🧪 prueba (franja amarilla) solo se ven las facturas de test; los sueldos y las cargas sociales no se mezclan.',
      ],
    },
    {
      icon: '☑', titulo: 'Cerrar el mes',
      desc: 'Es el H1 de la planilla vieja: hasta que una unidad no se cierra, el resumen anual no la cuenta.',
      pasos: [
        'Botón "Cerrar mes" al lado de cada unidad. Se cierra unidad por unidad, cuando está controlada.',
        'Reabrir: solo el admin.',
        'Un renglón en gris es una factura todavía no aprobada en Compras: aparece para que se vea, pero conviene cerrar recién cuando no quede ninguno.',
      ],
    },
    {
      icon: '✍️', titulo: 'A mano',
      desc: 'Renglones que no vienen de ningún módulo.',
      pasos: [
        'First Data y AMEX (Resu, por local), Banco Pesos y Tarjeta Business (Resu, Administración), Limpieza en negro (GNC, Unicenter), Edenor Admin al 50 % (GNC).',
        'Neto para FC A, bruto para FC B — la misma regla de siempre.',
        'Se borran desde la lista o desde la planilla (🗑).',
      ],
    },
    {
      icon: '🛍', titulo: 'Bolsas',
      desc: 'Lista de facturas de bolsas del año.',
      pasos: [
        'Se carga cada factura con su neto. El total del año se reparte mes a mes entre Alcorta y Unicenter según la venta de cada uno (acumulada al mes).',
        'Agregar una factura recalcula todos los meses del año, igual que la hoja Bolsas de antes.',
      ],
    },
    {
      icon: '📊', titulo: 'Año',
      desc: 'La hoja "Gastos año actual": unidad × categoría × mes.',
      pasos: [
        'Solo suma los meses CERRADOS. Con "incluir meses sin cerrar" se ve todo, marcado en el título de cada celda.',
        'Tarda unos segundos: arma los 12 meses de nuevo cada vez.',
      ],
    },
  ];
}

function abrirManual() {
  if (document.getElementById('manual-overlay')) return;
  const items = _manualSecciones();
  const ov = document.createElement('div');
  ov.id = 'manual-overlay';
  ov.innerHTML = `
    <div class="m-box">
      <div class="m-head">
        <span style="font-size:22px;">📖</span>
        <div style="flex:1;">
          <div style="font-weight:700;font-size:16px;">Manual · Documentos</div>
          <div style="font-size:12px;opacity:.85;">Guía rápida de cada herramienta del módulo</div>
        </div>
        <button class="m-close" onclick="cerrarManual()">✕</button>
      </div>
      ${items.map((s, i) => `
        <div class="m-sec">
          <div class="m-tit">${s.icon} ${i + 1}. ${_mEsc(s.titulo)}</div>
          <div class="m-desc">${_mEsc(s.desc)}</div>
          <ul class="m-pasos">${s.pasos.map(p => `<li>${_mEsc(p)}</li>`).join('')}</ul>
        </div>`).join('')}
      <div class="m-foot">💡 Este manual se actualiza junto con el sistema. ¿Falta algo o no funciona? Avisale a JP.</div>
    </div>`;
  ov.addEventListener('click', e => { if (e.target === ov) cerrarManual(); });
  document.body.appendChild(ov);
  document.body.style.overflow = 'hidden';
}

function cerrarManual() {
  const ov = document.getElementById('manual-overlay');
  if (ov) ov.remove();
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrarManual(); });

(function _manualInit() {
  const css = document.createElement('style');
  css.textContent = `
    #manual-overlay{position:fixed;inset:0;background:rgba(15,23,42,.55);z-index:9999;display:flex;align-items:flex-start;justify-content:center;padding:20px 12px;overflow-y:auto;-webkit-overflow-scrolling:touch;}
    #manual-overlay .m-box{background:#f8fafc;border-radius:14px;max-width:760px;width:100%;padding-bottom:6px;box-shadow:0 20px 60px rgba(0,0,0,.3);}
    #manual-overlay .m-head{position:sticky;top:0;background:#0f766e;color:#fff;padding:14px 18px;border-radius:14px 14px 0 0;display:flex;align-items:center;gap:10px;z-index:1;}
    #manual-overlay .m-close{background:rgba(255,255,255,.18);border:none;color:#fff;font-size:16px;border-radius:8px;padding:6px 11px;cursor:pointer;}
    #manual-overlay .m-sec{background:#fff;border:1px solid #e2e8f0;border-left:4px solid #0f766e;border-radius:10px;margin:14px 14px 0;padding:14px 18px;}
    #manual-overlay .m-tit{font-weight:700;font-size:15px;margin-bottom:4px;color:#115e59;}
    #manual-overlay .m-desc{font-size:13px;color:#475569;margin-bottom:8px;}
    #manual-overlay .m-pasos{margin:0 0 2px 18px;padding:0;font-size:13px;line-height:1.65;color:#334155;}
    #manual-overlay .m-pasos li{margin-bottom:4px;}
    #manual-overlay .m-foot{margin:16px 14px 12px;background:#fef3c7;border-left:4px solid #d97706;border-radius:8px;padding:11px 14px;font-size:12.5px;color:#92400e;}`;
  document.head.appendChild(css);

  const nav = document.querySelector('nav.tabs');
  if (nav) {
    const b = document.createElement('button');
    b.textContent = '📖 Manual';
    b.onclick = () => abrirManual();
    nav.appendChild(b);
  }
})();
