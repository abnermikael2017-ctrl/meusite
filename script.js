document.addEventListener('DOMContentLoaded', () => {
  // --- LÓGICA DO SLIDE ---
  const slides = document.querySelectorAll('.slide');
  let current = 0;
  const show = (i) => slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
  document.querySelector('.next-btn').onclick = () => { current = (current + 1) % slides.length; show(current); };
  document.querySelector('.prev-btn').onclick = () => { current = (current - 1 + slides.length) % slides.length; show(current); };
  setInterval(() => { current = (current + 1) % slides.length; show(current); }, 5000);

  // --- LÓGICA DO FORMULÁRIO (OPÇÃO 3) ---
  document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault(); 
      const myForm = e.target;
      const formData = new FormData(myForm);

      // Envia os dados para o Netlify silenciosamente (Ajax)
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      })
      .then(() => {
        // Redireciona para o WhatsApp com os dados de pagamento na mensagem
        if (myForm.getAttribute('name').includes('compra')) {
          const item = formData.get('item');
          
          // --- SEUS DADOS BANCÁRIOS ---
          const meuNumero = "351920418872"; 
          const IBAN = "PT50 1234 5678 9012 3456 7890 1"; // Substitua pelo seu IBAN real
          const Banco = "Seu Banco Aqui"; // Ex: Millennium BCP / BFA
          
          const texto = encodeURIComponent(`Olá! Quero comprar: ${item}.
Por favor, transfira o valor para:
Banco: ${Banco}
IBAN: ${IBAN}
Nome: Seu Nome/Empresa`);
          
          const linkWhatsApp = "wa.me" + meuNumero + "?text=" + texto;
          
          window.location.href = linkWhatsApp; // Usa window.location.href
        }
      })
      .catch((error) => {
        // Se houver erro de rede, tenta abrir o WhatsApp na mesma
        window.location.href = "wa.me351920418872";
      });
    });
  });
});
